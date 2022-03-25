import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import  {ActivatedRoute,Route,Router} from '@angular/router';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  text = '';
  show = false;
  noData = '';
  users: any[];
  mailId:string
  following:any=0
  follower:any=0
  totalBorrowed:any=0
  totalLended:any=0
  constructor(private userservice:UserService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.mailId=window.sessionStorage.getItem('sessionUserEmail');
    this.userservice.getDetails(this.mailId).subscribe(data => {
      this.following = data[0];
      this.follower = data[1];
      this.totalBorrowed = data[3];
      this.totalLended = data[2];
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
