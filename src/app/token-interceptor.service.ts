import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders} from '@angular/common/http'
import { Observable,of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private route: ActivatedRoute, 
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.indexOf('/oauth') == -1 && req.url.indexOf('/saveuser') == -1 && req.url.indexOf('/verifyemail') == -1 && req.url.indexOf('/resetpassword') == -1 && req.url.indexOf('/changepassword') == -1 && req.url.indexOf('/emailExists') == -1){
      if(JSON.parse(window.sessionStorage.getItem('token')) == undefined){
        this.router.navigate(['login']);
      return of(undefined);
      }
      else{
      req= req.clone({
        setHeaders: {Authorization: `Bearer ${JSON.parse(window.sessionStorage.getItem('token')).access_token}`}
       })
      return next.handle(req)
      }
      }
      else{
        return next.handle(req)
      }
      
  }
}
