import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  private tags = ["Business", "Corporate", "Corporation", "Creative", "Marketing", "Training", "Webdesign"];
  url;
  routerEvent: any;
  fan;
  followedTotal;
  followTotal;
  postsTotal;
  likepostsTotal;
  page=1;
  rows=20;
  params={
    page:this.page,
    rows:this.rows,
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {
    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url=location.pathname;
        var arr=this.url.split("/");
        $(".lis>li").each(function(index){
          $(this).css("background","#f3f3f3");
        });
        if(arr[2]=="blog"){
          $(".blog").css("background","#717171");
        }else if(arr[2]=="like"){
          $(".like").css("background","#717171");
        }else if(arr[2]=="followed"){
          $(".followed").css("background","#717171");
        }else if(arr[2]=="view"){
          $(".view").css("background","#717171");
        }else if(arr[2]=="notice"){
          $(".notice").css("background","#717171");
        }else if(arr[2]=="message"){
          $(".message").css("background","#717171");
        }
        this.getfollowedList(this.params);
        this.getfollowList(this.params);
        this.getlikepostsList();
        this.getpostsList();
        // console.log(this.url.split("/"));
      }
    });
  }
  getfollowList(params){
      this.dataService.getfollowList(params).subscribe(
      res => {
        this.followTotal=res.total;
      },
      error => { console.log(error) },
      () => { }
    );
  }
  getfollowedList(params){
    this.dataService.getfollowedList(params).subscribe(
      res => {
        this.followedTotal=res.total;
      },
      error => { console.log(error) },
      () => { }
    );
  }
  getlikepostsList(){
    this.dataService.getlikepostsList().subscribe(
      res => {
        this.likepostsTotal=res.total;
      },
      error => { console.log(error) },
      () => { }
    );
  }
  getpostsList(){
      this.dataService.getpostsList().subscribe(
      res => {
        this.postsTotal = res.total;
      },
      error => { console.log(error) },
      () => { }
    );
  }

  ngOnInit(){}
  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }

}
