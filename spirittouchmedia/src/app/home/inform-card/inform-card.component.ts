import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
@Component({
  selector: 'app-inform-card',
  templateUrl: './inform-card.component.html',
  styleUrls: ['./inform-card.component.less']
})
export class InformCardComponent implements OnInit {
  
  constructor(private dataService: DataService) { }
  gethotList(){
    this.dataService.gethotList().subscribe(
      res => {

      },
      error => { console.log(error) },
      () => { }
    );
  }
  ngOnInit() {
  }

}
