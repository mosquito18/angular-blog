import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../shared/services/data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.less']
})
export class DialogCardComponent implements OnInit {
  url;
  datas = [];
  posts = [];
  isLike = false;
  isBig = [];
  like=[];
  value;
  routerEvent: any;
  //标记是是否是大图
  enlarge(index) {
    this.isBig[index] = !this.isBig[index];
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {
    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = location.pathname;
        var arr = this.url.split("/");
        if (arr[2] == "like") {
          this.isLike = true;
        }
        if (arr[2] == "search") {
          this.value = this.route.snapshot.paramMap.get('searchcontent');
          this.dataService.getpostsList().subscribe(
            res => {
              var temp = res.info;
              for (var i = 0; i < temp.length; i++) {
                this.posts.push(temp[i]);
              }
              var data = this.posts;
              for (var i = 0; i < data.length; i++) {
                // console.log(data[i].content);
                if (data[i].content.toString().indexOf(this.value) != -1) {
                  this.datas.push(data[i]);
                }
                for (var j = 0; j < data[i].tags.length; j++) {
                  if (data[i].tags[j].toString().indexOf(this.value) != -1) {
                    this.datas.push(data[i]);
                  }
                }
              }
              this.posts = this.datas;
              for (var i = 0; i < this.posts.length; i++) {
                this.isBig[i] = false;
                this.like[i]=false;
              }
              // console.log(this.posts);
            },
            error => { console.log(error) },
            () => { }
          );
        } else {
          this.getlikepostsList();
        }
      }
    });
  }
  changeLike(i){
    this.like[i]=!this.like[i];
  }
  getlikepostsList() {
    this.dataService.getlikepostsList().subscribe(
      res => {
        this.posts = res.info;
        for (var i = 0; i < res.length; i++) {
          this.isBig[i] = false;
        }
      },
      error => { console.log(error) },
      () => { }
    );
  }
  ngOnInit() {}
}
