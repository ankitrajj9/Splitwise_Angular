import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import {Observable } from  'rxjs';
import {HttpParams } from '@angular/common/http';
import {Group} from './group'
Observable;

@Injectable()
export class UserService {
  private url= 'http://localhost:8080/users';

  private usersUrl: string;

  token:any;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  login(loginPayload) {
    const headerTst = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ankit:ankit@123')
      })
    }
    return this.http.post('http://localhost:8080/oauth/token', loginPayload, headerTst);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public save(user: User) {
    
    return this.http.post<User>('http://localhost:8080/saveuser', user);
  }
  public getUser(id): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public getUserByMailId(emailId:string): any{
    return this.http.get<User>(`http://localhost:8080/getUserByMailId/${emailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
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
    return this.http.get<User[]>(`http://localhost:8080/searchusers/${param}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
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
    return this.http.post<any>('http://localhost:8080/followuser', body,headerTst);
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
    return this.http.post<any>('http://localhost:8080/unfollowuser', body,headerTst);
  }
  public userFollows(fromMailId:any,toUserId:any) {
    return this.http.get<any>(`http://localhost:8080/userfollows/${fromMailId}/${toUserId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getFollowingUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/getfollowingusers/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getFollowerUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/getfollowerusers/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getDetails(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getdetails/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
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
      
    return this.http.post<any>('http://localhost:8080/savegroup', body,headerTst);
  }
  public findGroups(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/grouplisting/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getGroupDetails(groupId:any,mailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/groupdetails/${groupId}/${mailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getGroupUsers(groupId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/getgroupusers/${groupId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
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
      
    return this.http.post<any>('http://localhost:8080/addexpense', body,headerTst);
  }
  public getSharedDetails(userId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getSharedWithdetails/${userId}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public getSettleUpDetails(groupId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getsettleupdetails/${groupId}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
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
    return this.http.put<any>(`http://localhost:8080/settleuprequest`, body,headerTst);
  }
  public uploadImage(imageFormData:FormData) {
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
      })
    }
    
      
    return this.http.post<any>('http://localhost:8080/uploadImage', imageFormData,headerTst);
  }
  
  public getUserImages(userId:any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/getUserImages/${userId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public getGroupUserImages(groupId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getAllUserImages/${groupId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public verifyEmail(encodedMail:string): any{
    return this.http.get<any>(`http://localhost:8080/verifyemail/${encodedMail}`);
  }

  public resetPassword(emailId:any) {
    const body = new HttpParams()
    .set('emailId',emailId)
      
    return this.http.post<any>('http://localhost:8080/resetpassword', body);
  }

  public changePassword(encodedMailId:any,password:any) {
    const body = new HttpParams()
    .set('encodedMailId',encodedMailId)
    .set('password',password)
      
    return this.http.post<any>('http://localhost:8080/changepassword', body);
  }
}