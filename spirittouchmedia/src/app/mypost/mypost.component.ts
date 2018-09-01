import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.less']
})
export class MypostComponent implements OnInit {
  postId;
  nextpostId;
  post;
  posts = [];
  ran = [];
  hots = [];
  hotLen;
  private routerEvent: any;
  params={};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getpostsList();
        this.gethotList();
      }
    });
  }
  getpostsList() {
    this.ran = [];
    this.posts = [];
    this.postId = this.route.snapshot.paramMap.get('postId');
    this.nextpostId = parseInt(this.postId) + 1;
    this.dataService.getpostsList().subscribe(
      res => {
        var data = res.info;
        for (var i = 0; i < data.length; i++) {
          if (data[i].id == this.postId) {
            this.post = data[i];
            break;
          }
        }
        for (var j = 0; j < 5; j++) {
          var num = Math.floor(Math.random() * 18);
          var temp = true;
          for (var x = 0; x < this.ran.length; x++) {
            if (num === this.ran[x] || num < 0 || num >= data.length) {
              j--;
              temp = false;
              break;
            }
          }
          if (temp) {
            this.ran.push(num);
          }
        }
        for (var j = 0; j < 5; j++) {
          this.posts.push(data[this.ran[j]]);
        }
      },
      error => { console.log(error) },
      () => { }
    );
    console.log(this.postId);
  }
  gethotList() {
    this.dataService.gethotList().subscribe(
      res => {
        var data = res.info;
        this.hotLen = data.length;
        for (var i = 0; i < this.hotLen; i++) {
          if (data[i].postId == this.postId) {
            this.hots.push(data[i]);
          }
        }
      },
      error => { console.log(error) },
      () => { }
    );
  }
  // addhot(params) {
  //   this.params={
  //     ownId: 1,
	// 		postId: this.postId,
	// 		postName: this.post.postName,
	// 		friendId:friendId,
  //     friendAvatar:friendAvatar,
  //     friendName:friendName,
  //     like:like,
  //     recommend:recommend
  //   }
  //   this.dataService.addhot(params).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     error => { console.log(error) },
  //     () => { }
  //   );
  // }
  comment(){

  }
  // this.id = this.route.snapshot.queryParams['videodetail'];
  // this.id=this.route.snapshot.paramMap.get('videodetail');
  ngOnInit() {
    // this.postId=this.route.snapshot.queryParams['postId'];
  }
  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }
}
