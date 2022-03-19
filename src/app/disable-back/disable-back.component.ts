import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-disable-back',
  templateUrl: './disable-back.component.html',
  styleUrls: ['./disable-back.component.css']
})
export class DisableBackComponent implements OnInit {

  constructor( private location: LocationStrategy){  
    // preventing back button in browser implemented by "Samba Siva"  
     history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
    }

  ngOnInit(): void {
  }

}
