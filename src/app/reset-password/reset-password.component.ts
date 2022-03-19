import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import  {ActivatedRoute,Route,Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  validMessage:any
email:string
showDiv:boolean
cssStyle:string
encodedMailId:string
resetDiv:boolean
changeDiv:boolean
password:string
passwordConfirm:string
  constructor(private router: Router, private userService: UserService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.showDiv=true
    this.encodedMailId=this.route.snapshot.params['encodedMailId'];
    if(this.encodedMailId != undefined){
      this.changeDiv=true
      this.resetDiv=false
    }
    else{
      this.changeDiv=false
      this.resetDiv=true
    }
  }
  onSubmit() {
    if(this.encodedMailId != undefined){
      if(this.password != this.passwordConfirm){
        this.showDiv=false
      this.cssStyle='alert alert-danger'
      this.validMessage='Password Does Not Match'
      }
      else{
        this.userService.changePassword(this.encodedMailId,this.password).subscribe(data => {
          this.showDiv=false
      this.cssStyle='alert alert-success'
        this.validMessage='Please Changed Successfully'
        })
      }
    }
    else{
    if(this.email == undefined){
      this.showDiv=false
      this.cssStyle='alert alert-danger'
        this.validMessage='Please Insert Email'
     }
     else{
      this.userService.resetPassword(this.email).subscribe(data => {
        this.showDiv=false
      this.cssStyle='alert alert-success'
      this.validMessage='Password Reset Link Sent to your Mail Id'
      })
      }
    }
    }

}
