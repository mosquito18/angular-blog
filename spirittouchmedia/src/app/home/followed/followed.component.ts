import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.less']
})
export class FollowedComponent implements OnInit {
  fans;
  follows;
  followedTotal = 0;
  pages = 1;
  page = 1;
  rows = 20;
  params = {
    page: this.page,
    rows: this.rows,
  }
  bgColors = ["#ececec", "#ececec", "#f3f3f3", "#f3f3f3"];
  constructor(private dataService: DataService) { }
  showPlus() {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    $(target).find(".del").css({ display: "block" });
  }
  hidePlus() {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    $(target).find(".del").css({ display: "none" });
  }
  deletefollowed(obj) {
    this.dataService.deletefollowed(obj).subscribe(
      res => {
        this.fans = res.info;
        this.followedTotal = res.total;
        this.pages = Math.ceil(this.followedTotal / 20);
      },
      error => { console.log(error) },
      () => { }
    );
  }
  prview() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.params = {
        page: this.page,
        rows: this.rows,
      }
    }

    this.getfollowedList(this.params);
  }
  next() {
    if (this.page < this.pages) {
      this.page = this.page + 1;
      this.params = {
        page: this.page,
        rows: this.rows,
      }
    }

    this.getfollowedList(this.params);
  }
  addfollow(obj) {
    this.dataService.addfollow(obj).subscribe(
      res => {
        for (var i = 0; i < this.fans.length; i++) {
          if (obj.fanId == this.fans[i].fanId) {
            this.fans[i].isfollow = true;
          }
        }
      },
      error => { console.log(error) },
      () => { }
    );
  }
  getfollowedList(params) {
    this.dataService.getfollowedList(params).subscribe(
      res => {
        this.fans = res.info;
        this.followedTotal = res.total;
        this.pages = Math.ceil(this.followedTotal / 20);
        this.dataService.getfollowList({}).subscribe(
          data => {
            this.follows = data.info;
            for (var i = 0; i < this.fans.length; i++) {
              this.fans[i].isfollow = false;
              for (var j = 0; j < this.follows.length; j++) {
                if (this.fans[i].fanId == this.follows[j].fanId) {
                  this.fans[i].isfollow = true;
                  break;
                }
              }
            }
          },
          error => { console.log(error) },
          () => { }
        );
      },
      error => { console.log(error) },
      () => { }
    );
  }
  ngOnInit() {
    this.getfollowedList(this.params);

  }

}
