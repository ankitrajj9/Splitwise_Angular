import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import {Observable } from  'rxjs';
import {HttpParams } from '@angular/common/http';
import {Group} from './group'
Observable;

@Injectable()
export class UserService {
  private url= 'http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/users';

  private usersUrl: string;

  token:any;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/users';
  }

  login(loginPayload) {
    const headerTst = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ankit:ankit@123')
      })
    }
    return this.http.post('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/oauth/token', loginPayload, headerTst);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public save(user: User) {
    
    return this.http.post<User>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/saveuser', user);
  }
  public getUser(id): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public getUserByMailId(emailId:string): any{
    return this.http.get<User>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getUserByMailId/${emailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public update (user:User){
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    return this.http.put<User>(`${this.url}`, user,headerTst);
  }
  public searchUsers(param,fromMailId): Observable<User[]>{
    return this.http.get<User[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/searchusers/${param}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public followUser(fromMailId:any,toUserId:any) {
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/followuser', body,headerTst);
  }
  public unFollowUser(fromMailId:any,toUserId:any) {
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/unfollowuser', body,headerTst);
  }
  public userFollows(fromMailId:any,toUserId:any) {
    return this.http.get<any>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/userfollows/${fromMailId}/${toUserId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getFollowingUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getfollowingusers/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getFollowerUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getfollowerusers/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getDetails(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getdetails/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public saveGroup(groupDetail:any,params:any) {
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    const body = new HttpParams()
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('groupDetail',JSON.stringify(groupDetail))
      .set('params', JSON.stringify(params))
      
    return this.http.post<any>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/savegroup', body,headerTst);
  }
  public findGroups(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/grouplisting/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getGroupDetails(groupId:any,mailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/groupdetails/${groupId}/${mailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getGroupUsers(groupId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getgroupusers/${groupId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public addExpense(expenseDetail:any,users:User[],groupId:number) {
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('expenseDetail',JSON.stringify(expenseDetail))
      .set('users', JSON.stringify(users))
      
    return this.http.post<any>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/addexpense', body,headerTst);
  }
  public getSharedDetails(userId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getSharedWithdetails/${userId}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public getSettleUpDetails(groupId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getsettleupdetails/${groupId}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public settleUp (groupId:any,sessionUserEmail:any,toId:any,amount:any,flag:any,remarks:any){
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('toId',toId)
    .set('amount',amount)
    .set('flag',flag)
    .set('remarks',remarks)
    return this.http.put<any>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/settleuprequest`, body,headerTst);
  }
  public uploadImage(imageFormData:FormData) {
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    
      
    return this.http.post<any>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/uploadImage', imageFormData,headerTst);
  }
  
  public getUserImages(userId:any): Observable<any> {
    return this.http.get<any>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getUserImages/${userId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getGroupUserImages(groupId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/getAllUserImages/${groupId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public verifyEmail(encodedMail:string): any{
    return this.http.get<any>(`http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/verifyemail/${encodedMail}`);
  }

  public resetPassword(emailId:any) {
    const body = new HttpParams()
    .set('emailId',emailId)
      
    return this.http.post<any>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/resetpassword', body);
  }

  public changePassword(encodedMailId:any,password:any) {
    const body = new HttpParams()
    .set('encodedMailId',encodedMailId)
    .set('password',password)
      
    return this.http.post<any>('http://splitter.ml/AngularAPI-0.0.1-SNAPSHOT/changepassword', body);
  }
}