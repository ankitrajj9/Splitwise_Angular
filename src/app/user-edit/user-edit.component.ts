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

  constructor(private userservice:UserService,
    private route:ActivatedRoute,private router:Router,private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.user=new User();
    this.id = this.route.snapshot.params['id'];
    this.userservice.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        
        this.user = data;
        
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
    this.userservice.update(this.user).subscribe(result => this.gotoUserList());
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
        console.log(res)
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
      }
    )
  }
  
}
