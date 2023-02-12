import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-listing',
  templateUrl: './group-listing.component.html',
  styleUrls: ['./group-listing.component.css']
})
export class GroupListingComponent implements OnInit {
  groups: any[];
mailId:string
noGroup:boolean
text = '';
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.noGroup=false
    this.mailId=btoa(window.sessionStorage.getItem('sessionUserEmail'))
    this.userService.findGroups(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.groups = data;
      if(data == undefined || data.length == 0){
        this.noGroup=true
      }
    });
  }
  groupDetail(groupId: any,mailId:any){
    this.router.navigate(['groupdetails', groupId,mailId]);
  }

  searchGroup(obj) { // appending the updated value to the variable
    this.text = obj.target.value;
    console.log('test : ' + this.text);
    if(obj.target.value != undefined && obj.target.value != ''){
    this.userService.searchGroups(window.sessionStorage.getItem('sessionUserEmail'),this.text).subscribe(data => {
      this.groups = data;
      if(data == undefined || data.length == 0){
        this.noGroup=true
      }
      else{
        this.noGroup=false
      }
    });
  }
  else{
    this.ngOnInit();
  }
  
    
    
  }

}
