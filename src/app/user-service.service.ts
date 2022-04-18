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
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    
    return this.http.post<User>('http://localhost:8080/saveuser', user);
  }
  public getUser(id): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`);
  }

  public getUserByMailId(emailId:string): any{
    return this.http.get<User>(`http://localhost:8080/getUserByMailId/${emailId}`);
  }

  public update (user:User){
    return this.http.put<User>(`${this.url}`, user);
  }
  public searchUsers(param,fromMailId): Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:8080/searchusers/${param}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public followUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('http://localhost:8080/followuser', body);
  }
  public unFollowUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>('http://localhost:8080/unfollowuser', body);
  }
  public userFollows(fromMailId:any,toUserId:any) {
    return this.http.get<any>(`http://localhost:8080/userfollows/${fromMailId}/${toUserId}`);
  }
  public getFollowingUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/getfollowingusers/${fromMailId}`);
  }
  public getFollowerUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/getfollowerusers/${fromMailId}`);
  }
  public getDetails(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getdetails/${fromMailId}`);
  }
  public saveGroup(groupDetail:any,params:any) {
    const body = new HttpParams()
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('groupDetail',JSON.stringify(groupDetail))
      .set('params', JSON.stringify(params))
      
    return this.http.post<any>('http://localhost:8080/savegroup', body);
  }
  public findGroups(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/grouplisting/${fromMailId}`);
  }
  public getGroupDetails(groupId:any,mailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/groupdetails/${groupId}/${mailId}`);
  }
  public getGroupUsers(groupId:any): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/getgroupusers/${groupId}`);
  }
  public addExpense(expenseDetail:any,users:User[],groupId:number) {
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('expenseDetail',JSON.stringify(expenseDetail))
      .set('users', JSON.stringify(users))
      
    return this.http.post<any>('http://localhost:8080/addexpense', body);
  }
  public getSharedDetails(userId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getSharedWithdetails/${userId}/${fromMailId}`);
  }

  public getSettleUpDetails(groupId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getsettleupdetails/${groupId}/${fromMailId}`);
  }

  public settleUp (groupId:any,sessionUserEmail:any,toId:any,amount:any,flag:any,remarks:any){
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('toId',toId)
    .set('amount',amount)
    .set('flag',flag)
    .set('remarks',remarks)
    return this.http.put<any>(`http://localhost:8080/settleuprequest`, body);
  }
  public uploadImage(imageFormData:FormData) {
    return this.http.post<any>('http://localhost:8080/uploadImage', imageFormData);
  }
  
  public getUserImages(userId:any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/getUserImages/${userId}`);
  }
  public getGroupUserImages(groupId:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/getAllUserImages/${groupId}`);
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
  public getAuthorizationCode(){
    // http://localhost:8081/oauth/authorize
    const body = new HttpParams()
    .set('response_type','code')
    .set('client_id','javainuse')
    .set('redirect_uri','http://localhost:4200/externallogin')
    .set('scope','read')
    return this.http.post<any>('http://localhost:8081/oauth/authorize', body);
  }
  public getTokenFromAuthorizationCode(code:any){
    // http://localhost:8081/oauth/token
    const headerTst = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('javainuse:secret')
      })
    }
    const body = new HttpParams()
    .set('code',code)
    .set('grant_type','authorization_code')
    .set('redirect_uri','http://localhost/externallogin')
    return this.http.post<any>('http://localhost:8081/oauth/token', body,headerTst);
  }
  public getTestData(token:any){
    // http://localhost:8081/user/getEmployeesList
    return this.http.get<any>(`http://localhost:8081/user/getEmployeesList`+'?access_token=' + token);
  }

  public emailExists(emailId:string): any{
    return this.http.get<any>(`http://localhost:8080/emailExists/${emailId}`);
  }
}