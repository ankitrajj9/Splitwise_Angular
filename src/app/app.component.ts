import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SPLITWISE';
  sessionUserMail ='';
  ngOnInit(){
    this.sessionUserMail=window.sessionStorage.getItem('sessionUserEmail')
  }
}
