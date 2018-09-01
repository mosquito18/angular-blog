import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'app';
  url;
  isMy=false;
  routerEvent: any;
  constructor(private router: Router,){
  this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url=location.pathname;
        var arr=this.url.split("/");
        if(arr[1]=="my"){
          this.isMy=true;
        }else{
          this.isMy=false;
        }
      }
  });
  }

  ngOnInit() {
    
    // console.log(this.url!='/login');
  }
      ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }
}
