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
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.mailId=window.sessionStorage.getItem('sessionUserEmail')
    this.userService.findGroups(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.groups = data;
    });
  }
  groupDetail(groupId: any,mailId:any){
    this.router.navigate(['groupdetails', groupId,mailId]);
  }

}
