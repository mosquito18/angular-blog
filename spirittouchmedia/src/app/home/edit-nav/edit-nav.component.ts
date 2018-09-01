import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { CkeditorDialogComponent } from '../ckeditor-dialog/ckeditor-dialog.component';
@Component({
  selector: 'app-edit-nav',
  templateUrl: './edit-nav.component.html',
  styleUrls: ['./edit-nav.component.less']
})
export class EditNavComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  constructor(private modalService: NzModalService,) { }

  ngOnInit() {
    // var input1 = document.getElementById("upload");
    // var canvas = document.getElementById("cvs");
    // var ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    // if (typeof FileReader === 'undefined') {
    //   input1.setAttribute('disabled', 'disabled');
    // } else {
    //   input1.addEventListener('change', readFile, false);
    // }
    // function readFile() {
    //   var file = this.files[0];//获取上传文件列表中第一个文件
    //   if (!/image\/\w+/.test(file.type)) {
    //     //图片文件的type值为image/png或image/jpg
    //     alert("文件必须为图片！");
    //     return false;
    //   }
    //   // console.log(file);
    //   var reader = new FileReader();//实例一个文件对象
    //   reader.readAsDataURL(file);//把上传的文件转换成url
    //   //当文件读取成功便可以调取上传的接口
    //   reader.onload = function (e) {
    //     var image = new Image();
    //     // 设置src属性 
        
    //     // console.log(e.target.result);
    //     debugger;
    //     image.src = e.target.result;
    //     var max = 200;
    //     // 绑定load事件处理器，加载完成后执行，避免同步问题
    //     image.onload = function () {
    //       // canvas清屏 
    //       ctx.clearRect(0, 0, 200, 200);
    //       ctx.drawImage(image, 0, 0, 200, 200);
    //       // 注意，此时image没有加入到dom之中
    //     };
    //   }
    // }
  }
    showTestModalMiddle = (obj,type) => {
    // const self = this;
    const subscription = this.modalService.open({
      // title: '对话框标题',
      width:750,
      content: CkeditorDialogComponent,
      onOk() {
        // self.nzPageIndex=1;
        // self.getMenus(self.params);
      },
      onCancel() {

      },
      footer: false,
      // componentParams: {
      //   obj,
      //   type
      // }
    });
    subscription.subscribe(result => {
      // console.log(result);
    })
  }
}
