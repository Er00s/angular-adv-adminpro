import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;

  constructor(private http: HttpClient, private router: Router,private ngZone: NgZone) {
    this.googleInit();
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        //toma el error y con el of de RxJs permite crear un observable el base a el valor dado en el parentesis
        catchError((err) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*'
      })
    };

    let itemToSent = this.userMapperToDTO(formData);

    return this.http.post(`${base_url}/Auth/Login`, itemToSent,httpOptions ).pipe(      
      tap((resp: any) => {
        console.log(resp)
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  //init google
  googleInit() {

    return new Promise ( (resolve: any) => {

      console.log("google init");

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '746224652-sfjt7fvn5bslimf582a82dc8ulr1146u.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();

      });

    })
   
  }

  logOut() {
    localStorage.removeItem('token');
  
    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })    
    });    
  }

  userMapperToDTO(formData: LoginForm){
    let userToSent = <any>{};

    userToSent.Username = formData.username;
    userToSent.Password = formData.password;

    return userToSent;
  }
}
