import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  value;
  routerEvent: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router, ) {
    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.value = this.route.snapshot.paramMap.get('searchcontent');
      }
    });
  }
  ngOnInit() {
    
  }

}
