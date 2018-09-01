import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.less']
})
export class MyComponent implements OnInit {
  posts=[];
  id;
  user;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  getpostsList() {
    this.dataService.getpostsList().subscribe(
      res => {
        var data=res.info;
        for(var i=0;i<data.length;i++){
          if(data[i].ownerId==this.id){
            this.posts.push(data[i]);
          }
        }
      },
      error => { console.log(error) },
      () => { }
    );
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.dataService.getfollowList({}).subscribe(
      res => {
        var data=res.info;
        for(var i=0;i<data.length;i++){
          if(this.id==data[i].fanId){
            this.user=data[i];
          }
        }
        this.getpostsList();
      },
      error => { console.log(error) },
      () => { }
    );
  }

}
