import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit {
  fans;
  followedTotal=0;
  pages=1;
    page=1;
  rows=20;
  params={
    page:this.page,
    rows:this.rows,
  }
  bgColors=["#ececec","#ececec","#f3f3f3","#f3f3f3"];
  constructor(private dataService: DataService) { }
    showMinus() {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    $(target).find(".fa-minus-square").css({display:"block"});
  }
  hideMinus() {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    $(target).find(".fa-minus-square").css({display:"none"});
  }
  deletefollow(obj){
    this.dataService.deletefollow(obj).subscribe(
      res => {
        this.fans = res.info;
        this.followedTotal=res.total;
        this.pages=Math.ceil(this.followedTotal/20);
      },
      error => { console.log(error) },
      () => { }
    );
  }
  prview(){
    if(this.page>1){
      this.page=this.page-1;
            this.params = {
        page: this.page,
        rows: this.rows,
      }
    }
    
    this.getfollowList(this.params);
  }
  next(){
    if(this.page<this.pages){
      this.page=this.page+1;
            this.params = {
        page: this.page,
        rows: this.rows,
      }
    }
    
    this.getfollowList(this.params);
  }
  getfollowList(params){
        this.dataService.getfollowList(params).subscribe(
      res => {
        this.fans = res.info;
        this.followedTotal=res.total;
        this.pages=Math.ceil(this.followedTotal/20);
      },
      error => { console.log(error) },
      () => { }
    );
  }
  ngOnInit() {
    this.getfollowList(this.params);
  }

}
