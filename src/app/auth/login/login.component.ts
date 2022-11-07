import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public auth2: any;

  public loginForm = this.fb.group({
    //test100@gmail.com
    username: [
      localStorage.getItem('username') || '',
      [Validators.required, Validators.minLength(3)],
    ],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    debugger
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('username', this.loginForm.get('username').value);
        } else {
          localStorage.removeItem('username');
        }
        //navega al dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );

     //this.router.navigateByUrl('/');
  }

  //GOOGLE
  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  //GOOGLE
  async startApp() {
   
      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2;

      this.attachSignin(document.getElementById('my-signin2'));

   
  }

  //GOOGLE
  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe((resp) => {
          //navega al dashboard
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/');
          })
          
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
