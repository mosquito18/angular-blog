import { Component, OnInit } from '@angular/core';
var E = require('wangeditor');
import { NzModalSubject } from 'ng-zorro-antd';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-ckeditor-dialog',
  templateUrl: './ckeditor-dialog.component.html',
  styleUrls: ['./ckeditor-dialog.component.less']
})
export class CkeditorDialogComponent implements OnInit {
  isEmpty = false;
  _value = "";
  content="";
  addTags = [];
  tags = ["色彩", "1℃", "人像", "胶片", "情绪", "FoPoTo", "摄影", "纪实", "写真", "FaThTo", "女神", "行摄间", "杭州", "日系", "日本"]
  editor = new E('#editor');
  params={};
  myimgs=[];
  constructor(
    private subject: NzModalSubject,
    private dataService: DataService
    ) { }
  chooseTags(index) {
    this.tags.splice(index, 1);
    var e = event || window.event;
    var target = e.target || e.srcElement;
    this.addTags.push($(target).text());
    if (this.addTags.length > 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
    // debugger;
  }
  onClose(index, tag) {
    this.addTags.splice(index, 1);
    this.tags.push(tag);
    if (this.tags.length > 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }
  cancel(){
    // console.log('onCancel');
    this.subject.destroy('onCancel');
  }
  _submint(){
    this.params={
      ownerId:1,
      content:this.content,
      imgs:["../../assets/avatar/avatar1.png"],
      tags:this.addTags
    }
    this.addposts(this.params);
    console.log(this.params);
    // console.log(this.editor.txt.text());
    // console.log(this.editor.txt.html());
    this.subject.destroy('onOk');
  }
  addposts(params){
    this.dataService.addposts(params).subscribe(
      res => {
        console.log(res);

        // this.fans = res.info;
        // this.followedTotal = res.total;

        // this.pages = Math.ceil(this.followedTotal / 20);

      },
      error => { console.log(error) },
      () => { }
    );
  }
  getKey() {
    if (this._value != "") {
      this.addTags.push(this._value);
      if (this.addTags.length > 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    }
    this._value="";
  }
  ngOnInit() {
    var self=this;
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.linkImgCallback = function (url) {
      self.myimgs.push(url);
    }
    this.editor.create();
    
  }

}
