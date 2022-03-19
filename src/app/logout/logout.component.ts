import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute,Route,Router} from '@angular/router';
import {HttpParams } from '@angular/common/http';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
email:string;
password:string;
showDiv:boolean=true
errorMessage:string='Logged out Successfully . Please Log In to Continue'
displayCss='alert alert-success'
 
  invalidLogin: boolean = false;
  constructor( private router: Router, private userService: UserService) { }

  onSubmit() {
    if(this.email == undefined || this.password == undefined){
      this.showDiv=false
      this.displayCss='alert alert-danger'
        this.errorMessage='Please Insert Details'
     }else{
    const body = new HttpParams()
      .set('username', this.email)
      .set('password', this.password)
      .set('grant_type', 'password');

      this.userService.login(body.toString()).subscribe(data => {
        window.sessionStorage.setItem('token', JSON.stringify(data));
        console.log(window.sessionStorage.getItem('token'));
        window.sessionStorage.setItem('sessionUserEmail',this.email);
        this.router.navigate(['grouplisting']);
      }, error => {
        this.displayCss='alert alert-danger'
        this.showDiv=false
        this.errorMessage='Email Id or Password is Incorrect'
      });
    }
    }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    
  }
 

}
