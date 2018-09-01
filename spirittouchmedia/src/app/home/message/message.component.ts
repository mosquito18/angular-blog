import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
  messages;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getmessageList().subscribe(
      res => {
        this.messages = res.info;
        console.log(this.messages);
      },
      error => { console.log(error) },
      () => { }
    );
  }

}
