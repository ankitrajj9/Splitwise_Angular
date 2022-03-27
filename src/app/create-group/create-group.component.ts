import { Component, OnInit } from '@angular/core';
import {Group} from '../group'
import {User} from '../user'
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
group:Group;
users: User[];
selectedUsers: User[];
dropdownSettings:IDropdownSettings = {};
showDiv:boolean
errorMessage:string=''
  constructor(private userService: UserService,private router: Router) { 
    this.group = new Group();
  }

  ngOnInit(): void {
    this.showDiv=true
    this.userService.getFollowingUsers(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }
  onSubmit() {
    if(this.selectedUsers == undefined || this.selectedUsers.length == 0){
      this.showDiv=false;
      this.errorMessage='Please Select Group Members'
    }else{
    console.log('group details saved')
    this.userService.saveGroup(this.group,this.selectedUsers).subscribe(result => {console.log('saved')
    this.router.navigate(['grouplisting']);}
    );
  }
  }
 
  
}
