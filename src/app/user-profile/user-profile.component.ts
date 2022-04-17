import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Group } from '../group';
import { UserService } from '../user-service.service';
import  {ActivatedRoute,Route,Router,ParamMap} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id:any;
  user : User
  fromMailId:any;
  buttonText:string
  buttonStyle:string
  following = false;
  groups:Group[]
  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;

  constructor(private userservice:UserService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.buttonText='Follow'
      this.buttonStyle='background-color:green'
      this.id = params.get('id');
      this.user=new User();
    this.userservice.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        
        this.user = data;
        this.viewImage()
      this.userFollows(this.id);
      }, error => console.log(error));
      this.userservice.getSharedDetails(this.id,window.sessionStorage.getItem('sessionUserEmail'))
      .subscribe(data => {
        console.log(data)
        
        this.groups = data;
        
      }, error => console.log(error));
      
    });
    
  }
  followUser(toUserId: any){
    this.fromMailId = window.sessionStorage.getItem('sessionUserEmail');
    console.log(toUserId);
    this.userservice.followUser(this.fromMailId,toUserId)
    .subscribe(data => {
      this.following = true;
      console.log(data)
      this.buttonText='UnFollow'
      this.buttonStyle='background-color:red';
    }, error => console.log(error))
  }
  unFollowUser(toUserId: any){
    this.fromMailId = window.sessionStorage.getItem('sessionUserEmail');
    console.log(toUserId);
    this.userservice.unFollowUser(this.fromMailId,toUserId)
    .subscribe(data => {
      this.following = false;
      console.log(data)
      this.buttonText='Follow'
      this.buttonStyle='background-color:green';
    }, error => console.log(error))
  }
  userFollows(toUserId: any){
    this.fromMailId = window.sessionStorage.getItem('sessionUserEmail');
    this.userservice.userFollows(this.fromMailId,toUserId)
    .subscribe(data => {
      this.following=data;
      console.log(data)
      if(this.following)  {
      this.buttonText='UnFollow'
      this.buttonStyle='background-color:red';
      }
    }, error => console.log(error))
    return this.following;
  }
  followunfollowUser(toUserId: any){
    
    if(this.userFollows(toUserId) === true)  {
      this.unFollowUser(toUserId);
      }
      else{
        this.followUser(toUserId);
      }

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

}
