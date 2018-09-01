import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LikeComponent } from './like/like.component';
import { BlogComponent } from './blog/blog.component';
import { FollowedComponent } from './followed/followed.component';
import { NoticeComponent } from './notice/notice.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home.component';
import { ViewComponent } from './view/view.component';
import { SearchComponent } from './search/search.component';
const homeRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'like', component: LikeComponent },
      { path: 'followed', component: FollowedComponent },
      { path: 'view', component: ViewComponent },
      { path: 'notice', component: NoticeComponent },
      { path: 'message', component: MessageComponent },
      { path: 'search/:searchcontent', component: SearchComponent },  
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
