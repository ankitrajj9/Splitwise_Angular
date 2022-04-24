import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { User } from '../user';
import {HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-external-login',
  templateUrl: './external-login.component.html',
  styleUrls: ['./external-login.component.css']
})
export class ExternalLoginComponent implements OnInit {
  authCode:string
  userDetail:any
  user: User;
  tempToken:string
  dt: any;
    dataDisplay: any;
    public angular_url=environment.angular_url;
    public splitter_url=environment.splitter_url;
    public boot_demo_url=environment.boot_demo_url;

  constructor(private userService: UserService,private router: Router,private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.authCode = params['code'];
        console.log(this.authCode); 
      }
    );
  
    
    if(this.authCode != undefined){
    if(JSON.parse(sessionStorage.getItem('token')) == undefined){
      console.log(JSON.parse(sessionStorage.getItem('token')))
      this.userService.getTokenFromAuthorizationCode(this.authCode).subscribe(data => {
        window.sessionStorage.setItem('token', JSON.stringify(data));
        this.tempToken=JSON.parse(window.sessionStorage.getItem('token')).access_token
        console.log('Access Token : '+window.sessionStorage.getItem('token'));
        this.userService.getTestData(this.tempToken).subscribe(data=>{
          this.userDetail=data
          console.log('IF API RESPONSE START')
          console.log(data);
            console.log('User Details Received . . . Now saving')
            this.user = new User()
            this.user.dateOfBirth=this.userDetail.dateOfBirth
            this.user.name=this.userDetail.name
            this.user.email=this.userDetail.emailId
            this.user.password=this.userDetail.name+'@123'
            this.user.cstatus=1
            this.user.isExternal=1
            this.user.hobbies=this.userDetail.hobbies
          this.userService.save(this.user).subscribe(
            data => {
              const body = new HttpParams()
              .set('username', this.user.email)
              .set('password', this.user.password)
              .set('grant_type', 'password');
              this.userService.login(body.toString()).subscribe(data => {
                if (data) {
                  this.hideloader();
              }
                window.sessionStorage.removeItem('token');
                window.sessionStorage.setItem('token', JSON.stringify(data));
                console.log(window.sessionStorage.getItem('token'));
                window.sessionStorage.setItem('sessionUserEmail',this.user.email);
                this.router.navigate(['grouplisting']);
              });
            });
        });
        });
       }
        else{
          console.log('ELSE')
          console.log(JSON.parse(sessionStorage.getItem('token')))
          this.userService.getTestData(this.tempToken).subscribe(data=>{
            this.userDetail=data
            console.log('ELSE API RESPONSE START')
            console.log(data);
            if (data) {
              this.hideloader();
          }
           });
           this.router.navigate(['grouplisting']);
        }
      }
  
  }
   hideloader() {
  
    // Setting display of spinner
    // element to none
    document.getElementById('loading')
        .style.display = 'none';
}

}
