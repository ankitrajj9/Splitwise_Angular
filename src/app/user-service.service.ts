import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import {Observable } from  'rxjs';
import {HttpParams } from '@angular/common/http';
import {Group} from './group'
Observable;

@Injectable()
export class UserService {
  private url= 'https://localhost:8443/users';

  private usersUrl: string;

  token:any;

  constructor(private http: HttpClient) {
    this.usersUrl = 'https://localhost:8443/users';
  }

  login(loginPayload) {
    const headerTst = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ankit:ankit@123')
      })
    }
    return this.http.post('https://localhost:8443/oauth/token', loginPayload, headerTst);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    
    return this.http.post<User>('https://localhost:8443/saveuser', user);
  }
  public getUser(id): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`);
  }

  public getUserByMailId(emailId:string): any{
    return this.http.get<User>(`https://localhost:8443/getUserByMailId/${emailId}`);
  }

  public update (user:User){
    return this.http.put<User>(`${this.url}`, user);
  }
  public searchUsers(param,fromMailId): Observable<User[]>{
    return this.http.get<User[]>(`https://localhost:8443/searchusers/${param}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public followUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('https://localhost:8443/followuser', body);
  }
  public unFollowUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('https://localhost:8443/unfollowuser', body);
  }
  public userFollows(fromMailId:any,toUserId:any) {
    return this.http.get<any>(`https://localhost:8443/userfollows/${fromMailId}/${toUserId}`);
  }
  public getFollowingUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`https://localhost:8443/getfollowingusers/${fromMailId}`);
  }
  public getFollowerUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`https://localhost:8443/getfollowerusers/${fromMailId}`);
  }
  public getDetails(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:8443/getdetails/${fromMailId}`);
  }
  public saveGroup(groupDetail:any,params:any) {
    const body = new HttpParams()
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('groupDetail',JSON.stringify(groupDetail))
      .set('params', JSON.stringify(params))
      
    return this.http.post<any>('https://localhost:8443/savegroup', body);
  }
  public findGroups(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:8443/grouplisting/${fromMailId}`);
  }
  public getGroupDetails(groupId:any,mailId:any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:8443/groupdetails/${groupId}/${mailId}`);
  }
  public getGroupUsers(groupId:any): Observable<User[]> {
    return this.http.get<User[]>(`https://localhost:8443/getgroupusers/${groupId}`);
  }
  public addExpense(expenseDetail:any,users:User[],groupId:number) {
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('expenseDetail',JSON.stringify(expenseDetail))
      .set('users', JSON.stringify(users))
      
    return this.http.post<any>('https://localhost:8443/addexpense', body);
  }
  public getSharedDetails(userId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:8443/getSharedWithdetails/${userId}/${fromMailId}`);
  }

  public getSettleUpDetails(groupId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:8443/getsettleupdetails/${groupId}/${fromMailId}`);
  }

  public settleUp (groupId:any,sessionUserEmail:any,toId:any,amount:any,flag:any,remarks:any){
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('toId',toId)
    .set('amount',amount)
    .set('flag',flag)
    .set('remarks',remarks)
    return this.http.put<any>(`https://localhost:8443/settleuprequest`, body);
  }
  public uploadImage(imageFormData:FormData) {
    return this.http.post<any>('https://localhost:8443/uploadImage', imageFormData);
  }
  
  public getUserImages(userId:any): Observable<any> {
    return this.http.get<any>(`https://localhost:8443/getUserImages/${userId}`);
  }
  public getGroupUserImages(groupId:any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:8443/getAllUserImages/${groupId}`);
  }

  public verifyEmail(encodedMail:string): any{
    return this.http.get<any>(`https://localhost:8443/verifyemail/${encodedMail}`);
  }

  public resetPassword(emailId:any) {
    const body = new HttpParams()
    .set('emailId',emailId)
      
    return this.http.post<any>('https://localhost:8443/resetpassword', body);
  }

  public changePassword(encodedMailId:any,password:any) {
    const body = new HttpParams()
    .set('encodedMailId',encodedMailId)
    .set('password',password)
      
    return this.http.post<any>('https://localhost:8443/changepassword', body);
  }
}