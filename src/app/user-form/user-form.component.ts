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
  confirmPwd:string
  emailExist:boolean
  hideEmailValidation:boolean
  hidePasswordValidation:boolean
  hideHobbiesValidation:boolean

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService) {
          console.log('user form component load');
    this.user = new User();
  }
  ngOnInit():void{
    this.confirmPwd=''
    this.emailExist=false
    this.hideEmailValidation=true
    this.hidePasswordValidation=true
    this.hideHobbiesValidation=true
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
    if(this.formValidation() == true){
      this.user.dateOfBirth=this.getFormattedDate(this.user.dateOfBirth)
    this.userService.save(this.user).subscribe(result => this.gotoUserList());
    }
  }

  gotoUserList() {  
    //this.router.navigate([`viewprofile/{{user.id}}`]);
    this.mainDiv = true;
  this.divShow = false;
  }
  logIn(){
    this.router.navigate(['login']);
  }
  formValidation():boolean{
    let vbool=true
    
    if(this.user.password != this.confirmPwd){
      this.hidePasswordValidation=false
      vbool=false
    }
    else{
      this.hidePasswordValidation=true
    }
    if(this.emailExistsValidation() == true){
      vbool=false
    }
    if(this.user.hobbies == undefined || this.user.hobbies.length == 0){
      this.hideHobbiesValidation=false
      vbool=false
    }
    else{
      this.hideHobbiesValidation=true
    }
    return vbool
  }
  emailExistsValidation():boolean{
    let exists=false
    let tempMail = this.user.email
    this.userService.emailExists(tempMail).subscribe(result => {
      if(result == true){
        this.hideEmailValidation=false
        this.emailExist=true
        exists=true
        }
      else{
        this.hideEmailValidation=true
        this.emailExist=false
        exists=false
      }
    });
    return exists
  }
   getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
  }
}