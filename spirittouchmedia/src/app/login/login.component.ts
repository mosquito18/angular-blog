import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { UserLoginService } from '../shared/user/user-login.service';
import { UserRegisterService } from '../shared/user/user-register.service';
import { ForgetPwdService } from '../shared/user/forget-pwd.service';
import { DataService } from '../shared/services/data.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  setItem: Number = 0;
  isActivate = false;
  info;
  isregister = false;
  user = {
    "email": '',
    "password": ''
  };
  obj;
  routerEvent: any;
  onItemClick(type) {
    this.getUsers();
    var ev = event || window.event;
    var target = ev.target || ev.srcElement;
    this.setItem = type;
    $(".tabs li a").removeClass("active");
    $(target).addClass("active");
    $("#content").find('p').hide();
    $("#content").fadeIn(200);
  }
  validateForm: FormGroup;
  validateForm1: FormGroup;

  _submitForm() {
    // console.log(this.user);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }
  _submitForm1() {
    for (const i in this.validateForm1.controls) {
      this.validateForm1.controls[i].markAsDirty();
    }
  }
  getUsers() {
    this.dataService.getUsers()
      .subscribe(
      data => {
        this.info = data;
      },
      error => {
        console.error(error);
      }
      );
  }
  public doLogin(): void {
    for (const i in this.validateForm1.controls) {
      if (i) {
        this.validateForm1.controls[i].markAsDirty();
      }
    }
    if (this.validateForm.valid && this.isregister) {
      for (var i = 0; i < this.info.length; i++) {
        if (this.info[i].password === this.user.password) {
          sessionStorage.setItem("email", this.user.email);
          this.router.navigateByUrl("home");
        }
      }
    } else if (this.validateForm.valid) {
      for (var i = 0; i < this.info.length; i++) {
        if (this.info[i].email === this.user.email) {
          if (this.info[i].password === this.user.password) {
            sessionStorage.setItem("email", this.user.email);
            this.router.navigateByUrl("home");
          }
        }
      }
    }
  }
  isRegister() {
    // console.log(this.user.email);
    for (var i = 0; i < this.info.length; i++) {
      if (this.info[i].email === this.user.email) {
        this.isregister = true;
      }
      if (this.setItem == 1) {
        if (!this.isregister && this.user.email != '') {
          this._message.create('error', '该账户还未注册', { nzDuration: 3000 });
          this.user.email = '';
        }
      }
      if (this.setItem == 0) {
        if (this.isregister) {
          this._message.create('success', '该账户已注册，请登录', { nzDuration: 3000 });
          // this.user.email='';
        }
      }

    }
  }

  doRegister() {
    console.log(1);
    for (const i in this.validateForm.controls) {
      if (i) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
    if (this.validateForm.valid && !this.isregister) {
      this.dataService.register(this.user)
        .subscribe(
        data => {
          this.isActivate = true;
        },
        error => {
          console.error(error);
        }
        );
    }

  }

  public doLogout(): void {
    this.userLoginService.logout();
    this.router.navigateByUrl("home");
  }

  public forgetPwd(): void {
    this.router.navigateByUrl("forgetpwd");
  }
  constructor(
    private fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userLoginService: UserLoginService,
    public userRegisterService: UserRegisterService,
    public dataService: DataService,
    private _message: NzMessageService
  ) {
    if (sessionStorage.getItem("email")) {
      this.router.navigateByUrl("home");
    }
  }

  ngOnInit() {
    this.getUsers();
    var minh = document.documentElement.clientHeight;
    $("#loginComponent").css({ minHeight: minh });
    this.validateForm = this.fb.group({
      email: [null, [Validators.email]],
      password: [null, [Validators.required]],
    });
    this.validateForm1 = this.fb.group({
      email: [null, [Validators.email]],
      password: [null, [Validators.required]],
      remember: [true],
    });
    let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    let routerState: RouterState = this.router.routerState;
    let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }

}
