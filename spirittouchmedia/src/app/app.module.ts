import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpModule,JsonpModule} from '@angular/http';
import { routing } from './app.routing';
import { NgZorroAntdModule, NZ_LOCALE, enUS  } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeModule } from './home/home.module';
import { DataService } from './shared/services/data.service';
import { UserLoginService } from './shared/user/user-login.service';
import { UserRegisterService } from './shared/user/user-register.service';
import { ForgetPwdService } from './shared/user/forget-pwd.service';
import { MyComponent } from './my/my.component';
import { MypostComponent } from './mypost/mypost.component';
import { ImageUploadModule } from "angular2-image-upload";
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MyComponent,
    MypostComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    JsonpModule,
    NgZorroAntdModule,
    HomeModule,
    routing,
    ImageUploadModule.forRoot()
  ],
  providers: [
    DataService,
    UserLoginService,
    UserRegisterService,
    ForgetPwdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
