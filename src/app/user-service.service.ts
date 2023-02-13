import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import {Observable } from  'rxjs';
import {HttpParams } from '@angular/common/http';
import {Group} from './group'
import { environment } from '../environments/environment';
import { MessageDetail } from './message-detail';
Observable;

@Injectable()
export class UserService {
  private url= 'http://localhost:8080/users';
  private angular_url=environment.angular_url;
  private splitter_url=environment.splitter_url;
  private boot_demo_url=environment.boot_demo_url;

  private usersUrl: string;

  token:any;

  constructor(private http: HttpClient) {
    this.usersUrl = this.splitter_url+'/users';
  }

  login(loginPayload) {
    const headerTst = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ankit:ankit@123')
      })
    }
    return this.http.post(this.splitter_url+'/oauth/token', loginPayload, headerTst);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    
    return this.http.post<User>(this.splitter_url+'/saveuser', user);
  }
  public getUser(id): Observable<User>{
    return this.http.get<User>(this.splitter_url+`/users/${id}`);
  }

  public getUserByMailId(emailId:string): any{
    return this.http.get<User>(this.splitter_url+`/getUserByMailId/${emailId}`);
  }

  public update (user:User){
    return this.http.put<User>(this.splitter_url+'/users', user);
  }
  public searchUsers(param,fromMailId): Observable<User[]>{
    return this.http.get<User[]>(this.splitter_url+`/searchusers/${param}/${fromMailId}`+'?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
  public followUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>(this.splitter_url+'/followuser', body);
  }
  public unFollowUser(fromMailId:any,toUserId:any) {
    const body = new HttpParams()
      .set('fromMailId', fromMailId)
      .set('toUserId', toUserId)
    return this.http.post<any>(this.splitter_url+'/unfollowuser', body);
  }
  public userFollows(fromMailId:any,toUserId:any) {
    return this.http.get<any>(this.splitter_url+`/userfollows/${fromMailId}/${toUserId}`);
  }
  public getFollowingUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(this.splitter_url+`/getfollowingusers/${fromMailId}`);
  }
  public getFollowerUsers(fromMailId:any): Observable<User[]> {
    return this.http.get<User[]>(this.splitter_url+`/getfollowerusers/${fromMailId}`);
  }
  public getDetails(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/getdetails/${fromMailId}`);
  }
  public saveGroup(groupDetail:any,params:any) {
    const body = new HttpParams()
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('groupDetail',JSON.stringify(groupDetail))
      .set('params', JSON.stringify(params))
      
    return this.http.post<any>(this.splitter_url+'/savegroup', body);
  }
  public findGroups(fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/grouplisting/${fromMailId}`);
  }
  public getGroupDetails(groupId:any,mailId:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/groupdetails/${groupId}/${mailId}`);
  }
  public getGroupUsers(groupId:any): Observable<User[]> {
    return this.http.get<User[]>(this.splitter_url+`/getgroupusers/${groupId}`);
  }
  public addExpense(expenseDetail:any,users:User[],groupId:number) {
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('expenseDetail',JSON.stringify(expenseDetail))
      .set('users', JSON.stringify(users))
      
    return this.http.post<any>(this.splitter_url+'/addexpense', body);
  }
  public getSharedDetails(userId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/getSharedWithdetails/${userId}/${fromMailId}`);
  }

  public getSettleUpDetails(groupId : any,fromMailId:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/getsettleupdetails/${groupId}/${fromMailId}`);
  }

  public settleUp (groupId:any,sessionUserEmail:any,toId:any,amount:any,flag:any,remarks:any){
    const body = new HttpParams()
    .set('groupId',groupId)
    .set('sessionUserEmail',window.sessionStorage.getItem('sessionUserEmail'))
    .set('toId',toId)
    .set('amount',amount)
    .set('flag',flag)
    .set('remarks',remarks)
    return this.http.put<any>(this.splitter_url+`/settleuprequest`, body);
  }
  public uploadImage(imageFormData:FormData) {
    return this.http.post<any>(this.splitter_url+'/uploadImage', imageFormData);
  }
  
  public getUserImages(userId:any): Observable<any> {
    return this.http.get<any>(this.splitter_url+`/getUserImages/${userId}`);
  }
  public getGroupUserImages(groupId:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/getAllUserImages/${groupId}`);
  }

  public verifyEmail(encodedMail:string): any{
    return this.http.get<any>(this.splitter_url+`/verifyemail/${encodedMail}`);
  }

  public resetPassword(emailId:any) {
    const body = new HttpParams()
    .set('emailId',emailId)
      
    return this.http.post<any>(this.splitter_url+'/resetpassword', body);
  }

  public changePassword(encodedMailId:any,password:any) {
    const body = new HttpParams()
    .set('encodedMailId',encodedMailId)
    .set('password',password)
      
    return this.http.post<any>(this.splitter_url+'/changepassword', body);
  }
  public getAuthorizationCode(){
    // http://localhost:8081/oauth/authorize
    const body = new HttpParams()
    .set('response_type','code')
    .set('client_id','javainuse')
    .set('redirect_uri',this.angular_url+'/externallogin')
    .set('scope','read')
    return this.http.post<any>(this.boot_demo_url+'/oauth/authorize', body);
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
    .set('redirect_uri',this.angular_url+'/externallogin')
    return this.http.post<any>(this.boot_demo_url+'/oauth/token', body,headerTst);
  }
  public getTestData(token:any){
    // http://localhost:8081/user/getEmployeesList
    return this.http.get<any>(this.boot_demo_url+`/user/getEmployeesList`+'?access_token=' + token);
  }

  public emailExists(emailId:string): any{
    return this.http.get<any>(this.splitter_url+`/emailExists/${emailId}`);
  }

  public saveMessageDetail(messageDetail: any) {
    
    return this.http.post<User>(this.splitter_url+'/savemessage', messageDetail);
  }

  public getMessages(userId:number): any{
    return this.http.get<any>(this.splitter_url+`/getmessages/${userId}`);
  }

  public getMessageDetails(userId:number,recipientId:number): any{
    return this.http.get<any>(this.splitter_url+`/getmessagedetail/${userId}/${recipientId}`);
  }

  public getMessagesAndImage(userId:number): any{
    return this.http.get<any>(this.splitter_url+`/getmessagesandimage/${userId}`);
  }

  public uploadChatImage(imageFormData:FormData) {
    return this.http.post<any>(this.splitter_url+'/uploadChatImage', imageFormData);
  }

  public getMessageBetweenUsers(userId:number,recipientId:number): any{
    return this.http.get<any>(this.splitter_url+`/getmessagesbetweenusers/${userId}/${recipientId}`);
  }

  public getUnreadCount(userId:any): any{
    return this.http.get<any>(this.splitter_url+`/getunreadcount/${userId}`);
  }

  public updateMessageDetailRead(toId:any,fromId:any):any{
    return this.http.post<any>(this.splitter_url+`/readMessage/${toId}/${fromId}`,'');
  }
  public getUnreadMsgUsers(toId:any): any{
    return this.http.get<any>(this.splitter_url+`/getunreadmsgusers/${toId}`);
  }
  public getMsgDetailCount(userId:any,recipientId:any):any{
    return this.http.get<any>(this.splitter_url+`/getcountmessagedetail/${userId}/${recipientId}`);
  }
  public getMessageDetailsWithLimitAndOffset(userId:number,recipientId:number,limit:number,offset:number): any{
    return this.http.get<any>(this.splitter_url+`/getlimitedmessagedetail/${userId}/${recipientId}/${limit}/${offset}`);
  }

  public getInitialMessageDetails(userId:number,recipientId:number): any{
    return this.http.get<any>(this.splitter_url+`/getstartmessagedetails/${userId}/${recipientId}`);
  }

  public getNextMessageDetails(userId:number,recipientId:number,lastMaxId:number): any{
    return this.http.get<any>(this.splitter_url+`/getnextmessagedetails/${userId}/${recipientId}/${lastMaxId}`);
  }

  public getMaxMsgDtlId():any{
    return this.http.get<any>(this.splitter_url+`/getmaxmessagedetailid`);
  }

  public getInitialMsgDtlId(userId:number,recipientId:number):any{
    return this.http.get<any>(this.splitter_url+`/getinitialmessagedetailid/${userId}/${recipientId}`);
  }

  public getUserWiseUnreadCount(userId:number):any{
    return this.http.get<any>(this.splitter_url+`/getuserwiseunreadcount/${userId}`);
  }

  public searchGroups(fromMailId:any,searchText:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/searchgroups/${searchText}/${fromMailId}`);
  }

  public searchSortGroups(fromMailId:any,searchText:any,sortVal:any): Observable<any[]> {
    return this.http.get<any[]>(this.splitter_url+`/searchsortgroups/${searchText}/${sortVal}/${fromMailId}`);
  }
}