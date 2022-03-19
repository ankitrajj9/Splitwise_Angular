import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  validationMsg:any
  mailId:string
  cssClass:string
  retVal:any
  constructor(private route: ActivatedRoute, 
    private router: Router, 
      private userService: UserService) { }

  ngOnInit(): void {
    this.mailId=this.route.snapshot.params['mailId'];
    this.userService.verifyEmail(this.mailId).subscribe(data => {
      this.retVal=data
      if(this.retVal != '0'){
        this.cssClass='alert alert-success'
        if(this.retVal == '1'){
          this.validationMsg='Email Id is Verified Successfully'
        }else{
          this.validationMsg='Your Email Id is already verified'
        }
      }
      else{
        this.cssClass='alert alert-danger'
        this.validationMsg='Please Contact Support executive'
      }
      });
  }

}
