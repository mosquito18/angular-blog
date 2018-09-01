import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService {

  constructor(public http: Http) { }
  public getfollowedList(params:any) {
    return this.http.get(`activate/getfollowed?page=${params.page}&rows=${params.rows}`, {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
    public deletefollowed(params: any) {
    return this.http.get(`activate/deletefollowed?fanId=${params.fanId}`, {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  public getfollowList(params:any) {
    return this.http.post('activate/getfollow', params)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
    public addfollow(params: any) {
    return this.http.get(`activate/addfollow?fanId=${params.fanId}&fanAvatar=${params.fanAvatar}&fanName=${params.fanName}&fanedId=${params.fanedId}`, {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
    public deletefollow(params: any) {
    return this.http.get(`activate/deletefollow?fanId=${params.fanId}`, {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getpostsList() {
    return this.http.get('activate/getposts', {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  public gethotList() {
    return this.http.get('activate/gethot', {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
    public addhot(params: any) {
    return this.http.post('activate/addhot', params)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));

  }
  
  public getlikepostsList() {
    return this.http.get('activate/getlikeposts', {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));

  }
  public addposts(params: any) {
    return this.http.post('activate/addposts', params)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));

  }
  
  public getmessageList() {
    return this.http.get('activate/getmessage', {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  register(params: any): Observable<any> {
    return this.http.get(`activate?email=${params.email}&password=${params.password}`, {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  getUsers(): Observable<any> {
    return this.http.get('activate/getuser', {})
      .map(res => res.json().info)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}



