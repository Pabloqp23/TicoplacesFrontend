import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;
    private _token: string;
  constructor(private http: HttpClient) { }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('usuario') != null) {
      this._user= JSON.parse(sessionStorage.getItem('usuario')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user : User): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + 'ticoplaces1');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }
  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._user = new User();
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._user));
  }
  guardarToken(accessToken: string): void {
  this._token = accessToken;
  sessionStorage.setItem('token', accessToken);
}

obtenerDatosToken(accessToken: string): any {
  if (accessToken != null) {
    return JSON.parse(atob(accessToken.split(".")[1]));
  }
  return null;
}
isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
  hasRole( role: string): boolean {
      if (this.user.roles.includes(role)) {
        return true;
      }
      return false;
    }
    logout(): void {
  this._token = null;
  this._user = null;
  sessionStorage.clear();
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('usuario');
}
}
