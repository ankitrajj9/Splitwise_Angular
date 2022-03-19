import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserHobby } from '../user-hobby';
import { UserService } from '../user-service.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: User;
  mainDiv = false;
  divShow = true;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};
  hobbiesList : UserHobby[] = [
    {
     "hobbyName": "Cricket"
  },
  {
    "hobbyName": "FootBall"
},
{
  "hobbyName": "VolleyBall"
},
{
  "hobbyName": "BasketBall"
}
  ];

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService) {
          console.log('user form component load');
    this.user = new User();
  }
  ngOnInit():void{
    this.dropdownList = this.hobbiesList;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'hobbyName',
      textField: 'hobbyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }
  onSubmit() {
    this.userService.save(this.user).subscribe(result => this.gotoUserList());
  }

  gotoUserList() {  
    //this.router.navigate([`viewprofile/{{user.id}}`]);
    this.mainDiv = true;
  this.divShow = false;
  }
  logIn(){
    this.router.navigate(['login']);
  }
}