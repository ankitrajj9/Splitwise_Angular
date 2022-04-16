import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import {Observable } from  'rxjs';
import {HttpParams } from '@angular/common/http';
import {Group} from './group'
Observable;

@Injectable()
export class UserService {
  private url= 'http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/users';

  private usersUrl: string;

  token:any;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/users';
  }

  login(loginPayload) {
    const headerTst = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ankit:ankit@123')
      })
    }
    return this.http.post('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/oauth/token', loginPayload, headerTst);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    
    return this.http.post<User>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/saveuser', user);
  }
  public getUser(id): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`);
  }

  public getUserByMailId(emailId:string): any{
    return this.http.get<User>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getUserByMailId/${emailId}`);
  }

  public update (user:User){
    return this.http.put<User>(`${this.url}`, user);
  }
  public searchUsers(param,fromMailId): Observable<User[]>{
    return this.http.get<User[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/searchusers/${param}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public followUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/followuser', body);
  }
  public unFollowUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/unfollowuser', body);
  }
  public userFollows(fromMailId:any,toUserId:any) {
    return this.http.get<any>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/userfollows/${fromMailId}/${toUserId}`);
  }
  public getFollowingUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getfollowingusers/${fromMailId}`);
  }
  public getFollowerUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getfollowerusers/${fromMailId}`);
  }
  public getDetails(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getdetails/${fromMailId}`);
  }
  public saveGroup(groupDetail:any,params:any) {
    const body = new HttpParams()
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('groupDetail',JSON.stringify(groupDetail))
      .set('params', JSON.stringify(params))
      
    return this.http.post<any>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/savegroup', body);
  }
  public findGroups(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/grouplisting/${fromMailId}`);
  }
  public getGroupDetails(groupId:any,mailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/groupdetails/${groupId}/${mailId}`);
  }
  public getGroupUsers(groupId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getgroupusers/${groupId}`);
  }
  public addExpense(expenseDetail:any,users:User[],groupId:number) {
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('expenseDetail',JSON.stringify(expenseDetail))
      .set('users', JSON.stringify(users))
      
    return this.http.post<any>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/addexpense', body);
  }
  public getSharedDetails(userId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getSharedWithdetails/${userId}/${fromMailId}`);
  }

  public getSettleUpDetails(groupId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getsettleupdetails/${groupId}/${fromMailId}`);
  }

  public settleUp (groupId:any,sessionUserEmail:any,toId:any,amount:any,flag:any,remarks:any){
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('toId',toId)
    .set('amount',amount)
    .set('flag',flag)
    .set('remarks',remarks)
    return this.http.put<any>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/settleuprequest`, body);
  }
  public uploadImage(imageFormData:FormData) {
    return this.http.post<any>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/uploadImage', imageFormData);
  }
  
  public getUserImages(userId:any): Observable<any> {
    return this.http.get<any>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getUserImages/${userId}`);
  }
  public getGroupUserImages(groupId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/getAllUserImages/${groupId}`);
  }

  public verifyEmail(encodedMail:string): any{
    return this.http.get<any>(`http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/verifyemail/${encodedMail}`);
  }

  public resetPassword(emailId:any) {
    const body = new HttpParams()
    .set('emailId',emailId)
      
    return this.http.post<any>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/resetpassword', body);
  }

  public changePassword(encodedMailId:any,password:any) {
    const body = new HttpParams()
    .set('encodedMailId',encodedMailId)
    .set('password',password)
      
    return this.http.post<any>('http://splitter.ml:8080/AngularAPI-0.0.1-SNAPSHOT/changepassword', body);
  }
  public getAuthorizationCode(){
    const body = new HttpParams()
    .set('response_type','code')
    .set('client_id','javainuse')
    .set('redirect_uri','http://splitter.ml:4200/externallogin')
    .set('scope','read')
    return this.http.post<any>('http://splitter.ml:8081/oauth/authorize', body);
  }
  public getTokenFromAuthorizationCode(code:any){
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('javainuse:secret')
      })
    }
    const body = new HttpParams()
    .set('code',code)
    .set('grant_type','authorization_code')
    .set('redirect_uri','http://splitter.ml:4200/externallogin')
    return this.http.post<any>('http://splitter.ml:8081/oauth/token', body,headerTst);
  }
  public getTestData(token:any){
    return this.http.get<any>(`http://splitter.ml:8081/user/getEmployeesList`+'?access_token=' + token);
  }
}