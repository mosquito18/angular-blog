import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-my-dialog-card',
  templateUrl: './my-dialog-card.component.html',
  styleUrls: ['./my-dialog-card.component.less']
})
export class MyDialogCardComponent implements OnInit {
  posts=[];
  isLike=false;
  isBig=[];

  constructor(private dataService: DataService) { }
    getpostsList(){
    this.dataService.getpostsList().subscribe(
      res => {
        for(var j=0;j<res.info.length;j++){
          if(res.info[j].ownerId==1){
            this.posts.push(res.info[j]);
          }
        }
        for(var i=0;i<res.length;i++){
          this.isBig[i]=false;
        }
      },
      error => { console.log(error) },
      () => { }
    );
  }
  enlarge(index){
    this.isBig[index]=!this.isBig[index];
  }
  ngOnInit() {
    this.getpostsList();
  }

}
