import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_LOCALE, enUS } from 'ng-zorro-antd';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LikeComponent } from './like/like.component';
import { BlogComponent } from './blog/blog.component';
import { FollowedComponent } from './followed/followed.component';
import { NoticeComponent } from './notice/notice.component';
import { MessageComponent } from './message/message.component';
import { HomeRoutingModule } from './home-routing.module';
import { DialogCardComponent } from './dialog-card/dialog-card.component';
import { InformCardComponent } from './inform-card/inform-card.component';
import { EditNavComponent } from './edit-nav/edit-nav.component';
import { MyDialogCardComponent } from './my-dialog-card/my-dialog-card.component';
import { ViewComponent } from './view/view.component';
import { ImageUploadModule } from "angular2-image-upload";
import { CkeditorDialogComponent } from './ckeditor-dialog/ckeditor-dialog.component';
import { SearchComponent } from './search/search.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    ImageUploadModule.forRoot()
  ],
  entryComponents: [
    CkeditorDialogComponent
  ],
  providers: [{ provide: NZ_LOCALE, useValue: enUS }],
  declarations: [
    HomeComponent,
    HomePageComponent,
    LikeComponent,
    BlogComponent,
    FollowedComponent,
    NoticeComponent,
    MessageComponent,
    DialogCardComponent,
    InformCardComponent,
    EditNavComponent,
    MyDialogCardComponent,
    ViewComponent,
    CkeditorDialogComponent,
    SearchComponent
  ]
})
export class HomeModule { }
