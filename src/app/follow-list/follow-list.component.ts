import { Component, OnInit } from '@angular/core';
import {User} from '../user'
import { UserService } from '../user-service.service';
import { Router ,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css']
})
export class FollowListComponent implements OnInit {
  users: any[];
  id:number
  displayVal:string
  constructor(private userService: UserService,private router: Router,private route:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id ==1){
      this.displayVal='Following'
    this.userService.getFollowingUsers(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
  }
  else{
    this.displayVal='Followers'
    this.userService.getFollowerUsers(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
  }
  }

}
