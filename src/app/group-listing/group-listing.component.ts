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

}
