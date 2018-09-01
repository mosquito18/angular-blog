import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyComponent } from './my/my.component';
import { MypostComponent } from './mypost/mypost.component';
import { ContactComponent } from './contact/contact.component';
export const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },{
    path: 'my/:id',
    component:MyComponent
  },{
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },{
    path: 'my/:id/mypost/:postId',
    component:MypostComponent
  },{
    path: 'contact',
    component:ContactComponent
  },{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];
export const routing = RouterModule.forRoot(
  routes,
  { enableTracing: false } // <-- debugging purposes only
);
