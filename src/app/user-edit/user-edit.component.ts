import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute,Route,Router} from '@angular/router';
import { User } from '../user';
import { UserHobby } from '../user-hobby';
import { UserService } from '../user-service.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { FormGroup,FormBuilder,ReactiveFormsModule,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id:number;
user : User
vbool=true
selectedHobbies:string="BasketBall";
uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;


dropDownForm:FormGroup;
selectedVal:UserHobby[] ;
hobbiesList : UserHobby[] ;
dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};
  confirmPwd:string
  emailExist:boolean
  hideEmailValidation:boolean
  hidePasswordValidation:boolean
  hideHobbiesValidation:boolean
  tempDate:Date

  constructor(private userservice:UserService,
    private route:ActivatedRoute,private router:Router,private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.emailExist=false
    this.hideEmailValidation=true
    this.hidePasswordValidation=true
    this.hideHobbiesValidation=true
    this.user=new User();
    this.id = this.route.snapshot.params['id'];
    this.userservice.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
        this.confirmPwd=this.user.password
        this.tempDate=new Date()
       this.tempDate.setDate(parseInt(data.dateOfBirth.split('/')[0]))
       this.tempDate.setMonth(parseInt(data.dateOfBirth.split('/')[1])-1)
       this.tempDate.setFullYear(parseInt(data.dateOfBirth.split('/')[2]))

      }, error => console.log(error));
      this.hobbiesList= [
        {
         hobbyName: "Cricket"
      },
      {
        hobbyName: "FootBall"
      },
      {
      hobbyName: "VolleyBall"
      },
      {
      hobbyName: "BasketBall"
      }
      ];
     this.selectedItems= [
        {
            hobbyId: 8,
            hobbyName: "BasketBall"
        }
      ];
      this.dropDownForm = this.fb.group({
        myItems: [this.selectedItems]
    });
    this.dropdownList = this.hobbiesList;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'hobbyName',
      textField: 'hobbyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.viewImage()
  }
 
  onSubmit() {
    if(this.formValidation() == true){
      this.user.dateOfBirth=this.getFormattedDate(this.tempDate)
    this.userservice.update(this.user).subscribe(result => this.gotoUserList());
    }
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }

  gotoUserList() {
    this.router.navigate(['/getusers']);
  }
  uploadImage(){
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    imageFormData.append('userId', this.user.id);
    this.userservice.uploadImage(imageFormData).subscribe(result => this.viewImage()
    )
  }
  viewImage(){
    console.log('VIEW IMAGE START')
    this.userservice.getUserImages(this.id).subscribe(
      res => {
        console.log('VIEW IMAGE Response')
        this.postResponse = res;
        if(res != undefined){
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      }
    )
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
    
    if(this.user.hobbies == undefined || this.user.hobbies.length == 0){
      this.hideHobbiesValidation=false
      vbool=false
    }
    else{
      this.hideHobbiesValidation=true
    }
    return vbool
  }
  getFormattedDate(date):string {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
  }
}
