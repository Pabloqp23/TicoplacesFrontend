import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html'
})
 export class HeaderComponent {
title: string = 'TicoPlaces'
constructor(private authService: AuthService, private router: Router) { }
logout(): void {
  let username = this.authService.user.username;
  this.authService.logout();
  swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
  this.router.navigate(['/login']);
}
 }
