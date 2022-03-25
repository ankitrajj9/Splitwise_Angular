import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:User;
dbImage: any;
  postResponse: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = new User()
    this.userService.getUserByMailId(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.user = data;
    this.userService.getUserImages(this.user.id).subscribe(
      res => {
        console.log('VIEW IMAGE Response')
        this.postResponse = res;
        console.log(res)
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
      }
    )
    });
  }

}
