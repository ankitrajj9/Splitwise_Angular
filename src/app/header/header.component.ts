import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service.service';
import  {ActivatedRoute,Route,Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:User;
dbImage: any;
  postResponse: any;
  show = false;
  text = '';
  noData = '';
  users: any[];
  mailId:string
  constructor(private userservice:UserService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.mailId=window.sessionStorage.getItem('sessionUserEmail');
    this.user = new User()
    this.userservice.getUserByMailId(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.user = data;
    this.userservice.getUserImages(this.user.id).subscribe(
      res => {
        console.log('VIEW IMAGE Response')
        this.postResponse = res;
        console.log(res)
        if(res != undefined){
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      }
    )
    });
  }

  searchUser(obj) { // appending the updated value to the variable
    this.text = obj.target.value;
    console.log('test : ' + this.text);
    if(obj.target.value != undefined && obj.target.value != ''){
    this.userservice.searchUsers(this.text,this.mailId).subscribe(data => {
      this.users = data;
      if(Object.keys(this.users).length !== 0 ){
      this.show=true;
      }
      else{this.show=false;}
      console.log('result : ' + this.users);
    });
  }
  else{
    this.show=false;
  }
    
    
  }
}
