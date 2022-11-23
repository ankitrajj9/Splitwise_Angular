import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service.service';
import  {ActivatedRoute,Route,Router} from '@angular/router';
import $ from 'jquery';

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
  fromMailId:any;
  following: boolean
  constructor(private userservice:UserService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.following=false
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

  userFollows(toUserId: any):boolean{
    this.fromMailId = window.sessionStorage.getItem('sessionUserEmail');
    this.userservice.userFollows(this.fromMailId,toUserId)
    .subscribe(data => {
      if(data == true){
        let comp = <HTMLElement> document.getElementById('color_'+toUserId)
        comp.setAttribute("style", "background-color:green");
        this.unFollowUser(toUserId);
        $("#color_"+toUserId).html(
          '<span class="mat-button-wrapper">Follow</span><span matripple="" class="mat-ripple mat-button-ripple" ng-reflect-disabled="false" ng-reflect-centered="false" ng-reflect-trigger="[object HTMLButtonElement]"></span><span class="mat-button-focus-overlay"></span>'
        )
      }
      else{
        let comp = <HTMLElement> document.getElementById('color_'+toUserId)
        comp.setAttribute("style", "background-color:red");
        this.followUser(toUserId);
        $("#color_"+toUserId).html(
          '<span class="mat-button-wrapper">UnFollow</span><span matripple="" class="mat-ripple mat-button-ripple" ng-reflect-disabled="false" ng-reflect-centered="false" ng-reflect-trigger="[object HTMLButtonElement]"></span><span class="mat-button-focus-overlay"></span>'
        )
      }
    }, error => console.log(error))
    return this.following;
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

  
  followUser(toUserId: any){
    this.fromMailId = window.sessionStorage.getItem('sessionUserEmail');
    console.log(toUserId);
    this.userservice.followUser(this.fromMailId,toUserId)
    .subscribe(data => {
      console.log(data)
    }, error => console.log(error))
  }
  unFollowUser(toUserId: any){
    this.fromMailId = window.sessionStorage.getItem('sessionUserEmail');
    console.log(toUserId);
    this.userservice.unFollowUser(this.fromMailId,toUserId)
    .subscribe(data => {
      console.log(data)
    }, error => console.log(error))
  }
  
  followunfollowUser(toUserId: any,event:any){
    let comp = <HTMLElement> document.getElementById('color_'+toUserId)
    
    this.userFollows(toUserId)
      //comp.setAttribute("style", "background-color:green");
      //this.unFollowUser(toUserId);
      
        //comp.setAttribute("style", "background-color:red");
        //this.followUser(toUserId);
      

  }
  
  
}
