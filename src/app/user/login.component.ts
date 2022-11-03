import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from './user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
title : string = 'Por favor iniciar Sesion!';
user: User;
  constructor(private authService: AuthService, private router: Router) {
this.user = new User;
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
    swal.fire('Login', `Hola ${this.authService.user.username} ya estás autenticado!`, 'info');
    this.router.navigate(['']);
  }
  }
  login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let user = this.authService.user;
      this.router.navigate(['']);
      swal.fire('Login', `Hola ${user.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }

}
