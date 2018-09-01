import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  url;
  isMy=false;
  isMine=true;
  routerEvent: any;
  _value = '';
  userName="鲨鱼尾";

  onSearch(event: string): void {
    console.log(event);
  }
  logout(){
    console.log(sessionStorage.getItem('email'));
    sessionStorage.removeItem('email');
    console.log(sessionStorage.getItem('email'));
    this.router.navigateByUrl("login");

  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
    ) {
      this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url=location.pathname;
        var arr=this.url.split("/");
        if(arr[1]=="my"){
          this.isMy=true;
        }else{
          this.isMy=false;
        }
        
        if(arr[2]!=1){
        this.isMine=false;
        this.dataService.getfollowList({}).subscribe(
          res => {
            var data=res.info;
            for(var i=0;i<data.length;i++){
              if(arr[2]==data[i].fanId){
                this.userName=data[i].fanName;
              }
            }
          },
          error => { console.log(error) },
          () => { }
        );
      }else{
          this.isMine=true;
          this.userName="鲨鱼尾";
        }

      }
    });
  }
  
  ngOnInit() {

  }

}
