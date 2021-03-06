import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({

    nombre: ['Fernando',[Validators.required, Validators.minLength(3) ]],
    password: ['1234567',[Validators.required,  ]],
    password2: ['1234567',[Validators.required,  ]],
    email: ['test100@gmail.com',[Validators.required, Validators.minLength(3), Validators.email ]],    
    terminos: [true,[Validators.required,]]

  },{
    validators: this.passwordsIguales('password', 'password2')
  } );

  constructor(private fb: FormBuilder,
              private userService: UsuarioService,
              private router: Router ) {

      
   }

  ngOnInit(): void {

  }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return
    }
  
      this.userService.crearUsuario(this.registerForm.value )
      .subscribe(resp =>{
        console.log("usuario creado");
        console.log(resp);
          //navega al dashboard
          this.router.navigateByUrl('/');
      }, (err)=> {
        // Swal.fire('Error',err.error.msg, 'error');
        Swal.fire('Error',err.error.msg, 'error');
      } );
    

  }

  campoNoValido(campo: string): boolean {

   if(this.registerForm.get(campo).invalid && this.formSubmitted){
    return true;
   }else{
     return false;
   }
  }

  contraseneasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ){
      return true;
    }else {
      return false;
    }
  }

  aceptaTerminos(): boolean{
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1name: string, pass2name: string){
    return (formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1name);      
      const pass2Control = formGroup.get(pass2name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
          pass2Control.setErrors({ noEsIgual: true })
      }

    }
  }
}
