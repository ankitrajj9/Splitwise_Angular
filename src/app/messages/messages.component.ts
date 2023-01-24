import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../message';
import { MessageDetail } from '../message-detail';
import { User } from '../user';
import { UserService } from '../user-service.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import {Howl} from 'howler';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  currentUser:User
  recipientUser:User
  messageDetail:MessageDetail
  messages:Message[]
  userId:any
  text = '';
  users: any[];
  show = false;
  mailId:string
  showNoMsg:boolean
  chatLabelHead:string
  chatLabelTotalMessages:string
  recipientId:any
  messageDetails:MessageDetail[]
  groupUserImages:any[]
  recipientImage:any
  currentUserImage:any
  uploadedImage:File
  maxMessageDetailId:number
  displayNewMsgCss:boolean=false
  currentMsgBlock:any
  isMessageExist:boolean=false
  unreadFromUsers:any[]
  hidedisplay:boolean=true
  count:string='0'
  chatSubscription:any
  msgSubscription:any
  classShowNewMsg:boolean=true
  scrollDivHeight:any
  limit:number=10
  offSet:number
  totalMsgDetailCount:number
  lastReceivedMsgDtlId:number
  initialMsgDetails:MessageDetail[]
  afterMsgDetails:MessageDetail[]
  maxMsgDtlId:number=0
  chatDivTopScrollPosition:any
  tmp:any
  @ViewChild("msgCardBody") chatComponent:ElementRef
  currentMsgId:any
  displaySpinner:boolean=false
  initialMsgDtlId:number=0
  showProfileButton:boolean=false
  userWiseUnread:any
  incomingMsgSound:Howl
  private socket_url=environment.socket_url;

private serverUrl = 'http://localhost:8080/socket'
  //private title = 'WebSockets chat';
  private stompClient;

  initializeWebSocketConnection(){
    let ws = new SockJS(this.socket_url);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, frame => {
      if(this.recipientId != undefined){
       this.chatSubscription= that.stompClient.subscribe(`/chat/${this.userId}/${this.recipientId}`, (message) => {
        if(message.body) {
          //$(".chat").append("<div class='message'>"+message.body+"</div>")
          //console.log(message.body);
          this.incomingMsgSound.play();
          this.getMessageDetails(this.userId,this.recipientId)
          //this.readMessage(this.userId,this.recipientId)
          //this.getUnReadCount(this.userId)
        }
      });
    }
      this.msgSubscription= that.stompClient.subscribe(`/chatrcvdynmsg/${this.userId}`, (message) => {
        if(message.body) {
          console.log('RECEIVED DYN MSG')
          this.incomingMsgSound.play();
          this.userservice.getMessagesAndImage(this.userId).subscribe(
            data => {
              console.log("Image Data : ");
              console.log(data)
              this.groupUserImages=data;
              }
          );
          this.userservice.getMessages(this.userId).subscribe(
            data => {
              console.log(data);
              this.messages=data;
              if(data.length == 0){
                this.showNoMsg=true
              }
              }
          );
          this.userservice.getUnreadMsgUsers(this.userId).subscribe(
            data => {
              console.log(data)
              this.unreadFromUsers = data;
            }
          )
          this.userservice.getUserWiseUnreadCount(this.userId).subscribe(
            data => {
              console.log('USER WISE UNREAD DATA')
              console.log(data)
              this.userWiseUnread = data;
            }
          )
          this.getUnReadCount(this.userId)
        }
      });
    });
  }

  sendMessage(userId:any,recipientId:any):any{
    this.stompClient.send("/app/send/chatmessage" , {}, btoa(`${userId}_${recipientId}`));
    this.stompClient.send("/app/send/chatmessagenotification" , {}, btoa(`${recipientId}`));
    this.stompClient.send("/app/send/chatdynmsgsend" , {}, btoa(`${recipientId}`));
    //$('#input').val('');
  }

  constructor(private userservice:UserService,
    private route:ActivatedRoute,private scroller: ViewportScroller,private router:Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.initializeWebSocketConnection();
      }
     ngOnDestroy(): void{
      if(this.msgSubscription != undefined){
      this.msgSubscription.unsubscribe();
      }
      if(this.chatSubscription != undefined){
      this.chatSubscription.unsubscribe();
    }
     }
     

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.recipientId=this.route.snapshot.params['recipientId'];
    console.log('recipientId : ' + this.recipientId)
    this.incomingMsgSound = new Howl({  
      src: ['./assets/incoming_msg.mp3']
    });
      if(this.recipientId != undefined){
        this.userservice.getUser(this.recipientId).subscribe(data => {
          this.recipientUser = data;
          this.messageDetail.toId=this.recipientUser
          this.chatLabelHead=this.recipientUser.name
          console.log('Change recipient called to : ' + this.recipientUser)
      });
      this.userservice.getMsgDetailCount(this.userId,this.recipientId).subscribe(
        data => {
          console.log('TOTAL NO. OF MSGS : '+data)
          this.totalMsgDetailCount=data;
        }
      )
      this.userservice.getInitialMsgDtlId(this.userId,this.recipientId).subscribe(
        data => {
          this.initialMsgDtlId = data;
          console.log('INITIAL MSG DTL ID : '+this.initialMsgDtlId)
          }
      )
        this.userservice.getMaxMsgDtlId().subscribe(
          data => {
            this.maxMessageDetailId=data
          }
        )

      this.userservice.getInitialMessageDetails(this.userId,this.recipientId).subscribe(data => {
        this.messageDetails = data;
        console.log('Message Details' + this.messageDetails)
        //this.lastReceivedMsgDtlId = this.findMaxMsgDetailId(this.messageDetails)
        let lowestId:number=this.maxMessageDetailId;
        this.messageDetails.forEach(msgDetail => {
      if(msgDetail.messageDetailId < lowestId){
        lowestId = msgDetail.messageDetailId
      }
      
  });
  this.lastReceivedMsgDtlId = lowestId
        console.log('lastReceivedMsgDtlId FROM ALL : '+this.lastReceivedMsgDtlId)
        if(this.lastReceivedMsgDtlId <= this.initialMsgDtlId){
          console.log('LOWEST ID : '+this.lastReceivedMsgDtlId)
          console.log('initialMsgDtlId ID : '+this.initialMsgDtlId)
          this.showProfileButton=true;
        }
        setTimeout(()=>{
          this.classShowNewMsg=false
        }, 3000);
        this.classShowNewMsg=true
        $("#msgCardBody").animate({
          scrollTop: $(
          '#msgCardBody').get(0).scrollHeight+20000
          }, 1000);
          this.userservice.updateMessageDetailRead(this.userId,this.recipientId).subscribe(
            data => {
              console.log('Messages Set as READ');
            }
          )
          this.userservice.getUnreadCount(this.userId).subscribe(
            unread => {
              console.log('UNREAD COUNTS : '+unread)
              this.count=unread
              if(this.count != '0'){
                this.hidedisplay=false
                console.log('hide display : '+this.hidedisplay)
                console.log('unread counts : '+this.count)
              }
            }
          )
        });
    /*
    this.userservice.getInitialMessageDetails(this.userId,this.recipientId).subscribe(data => {
      this.initialMsgDetails = data;
      //this.messageDetails=this.initialMsgDetails
      console.log('Initial Message Details' + this.initialMsgDetails)
      this.lastReceivedMsgDtlId = this.findMaxMsgDetailId(this.initialMsgDetails)
      console.log('lastReceivedMsgDtlId from initial : '+this.lastReceivedMsgDtlId)
      $("#msgCardBody").animate({
        scrollTop: $(
        '#msgCardBody').get(0).scrollHeight+20000
        }, 1000);
  });
  */
    this.userservice.getUserImages(this.recipientId).subscribe(
      res => {
        console.log('VIEW IMAGE Response')
        if(res != undefined){
        this.recipientImage = 'data:image/jpeg;base64,' + res.image;
        }
      }
    )
    this.userservice.getUserImages(this.userId).subscribe(
      res => {
        console.log('VIEW IMAGE Response')
        if(res != undefined){
        this.currentUserImage = 'data:image/jpeg;base64,' + res.image;
        }
      }
    )
    this.currentMsgBlock=+this.userId+'_'+this.recipientId
    //$('#msgHover_'+this.userId+'_'+this.recipientId).css('background-color' ,'rgba(0,0,0,0.2)');
    this.userservice.getMessageBetweenUsers(this.userId,this.recipientId).subscribe(
      res => {
        console.log(res)
        if(res != undefined && res != ''){
          this.isMessageExist=true
        }else{
          this.isMessageExist=false
          //console.log('DYN ATTR : '+dynamicAttr)
          //$('#msgList').prepend('<div '+dynamicAttr+'="" id="msgHover" class="d-flex bd-highlight" style="cursor: pointer;"><div '+dynamicAttr+'="" class="img_cont"><img '+dynamicAttr+'="" class="rounded-circle user_img ng-star-inserted" src="'+this.recipientImage+'"><span '+dynamicAttr+'="" class="online_icon"></span></div><div '+dynamicAttr+'="" class="user_info"><span '+dynamicAttr+'="">'+this.recipientUser.name+'</span><p '+dynamicAttr+'="">'+this.recipientUser.name+' is online</p></div></div>')
        }

      }
    )
    }

    this.mailId=window.sessionStorage.getItem('sessionUserEmail');
    this.chatLabelHead='Click On User name to start Chat'
    this.chatLabelTotalMessages='No Messages'
    this.messageDetail=new MessageDetail()
    this.userservice.getUserByMailId(window.sessionStorage.getItem('sessionUserEmail')).subscribe(data => {
      this.currentUser = data;
      this.messageDetail.fromId=this.currentUser;
      console.log(this.messageDetail)
  });
  this.userservice.getMessagesAndImage(this.userId).subscribe(
    data => {
      console.log("Image Data : ");
      console.log(data)
      this.groupUserImages=data;
      }
  );
  this.userservice.getMessages(this.userId).subscribe(
    data => {
      console.log(data);
      this.messages=data;
      if(data.length == 0){
        this.showNoMsg=true
      }
      }
  );
  this.userservice.getUnreadMsgUsers(this.userId).subscribe(
    data => {
      console.log(data)
      this.unreadFromUsers = data;
    }
  )
  this.userservice.getUserWiseUnreadCount(this.userId).subscribe(
    data => {
      console.log('USER WISE UNREAD DATA')
      console.log(data)
      this.userWiseUnread = data;
    }
  )
}

ngAfterViewInit():void{
  //this.chatDivTopScrollPosition = this.chatComponent.nativeElement.scrollHeight
  //alert(this.chatComponent.nativeElement.scrollHeight)
 }
 

readMessage(userId:any,recipientId:any):any{
  this.userservice.updateMessageDetailRead(userId,recipientId).subscribe(
    data => {
      
      console.log('Messages Set as READ');
      //this.stompClient.send("/app/send/chatmessagenotification" , {}, btoa(`${this.recipientId}`));
      this.getUnReadCount(userId)
    }
  )
}

public getTotalMsgDetailsCount(userId:any,recipientId:any):any{
  this.userservice.getMsgDetailCount(userId,recipientId).subscribe(
    data => {
      this.totalMsgDetailCount=data;
    }
  )
}

getUnReadCount(userId:any):any{
  this.userservice.getUnreadCount(userId).subscribe(
    unread => {
      console.log('UNREAD COUNTS : '+unread)
      this.count=unread
      if(this.count != '0'){
        this.hidedisplay=false
        console.log('hide display : '+this.hidedisplay)
        console.log('unread counts : '+this.count)
      }
    }
  )
}

  saveMessage() {
    let dynamicAttrKey=''
    if(this.messageDetail.content != '' && this.messageDetail.content != undefined){
      console.log('Message Content : '+this.messageDetail.content);
      this.messageDetail.contentType=1
    this.userservice.saveMessageDetail(this.messageDetail).subscribe(
      data => {
        $('#usersss').each(function() {
          $.each(this.attributes, function() {
            // this.attributes is not a plain object, but an array
            // of attribute nodes, which contain both the name and value
            if(this.specified) {
          if(this.name.startsWith('_ng')){
              dynamicAttrKey=this.name
            }
            }
          });
        });
        console.log('Message Details Saved');
        
        
        $("#msgCardBody").animate({
          scrollTop: $(
          '#msgCardBody').get(0).scrollHeight
          }, 1000);
          this.sendMessage(this.messageDetail.fromId.id,this.messageDetail.toId.id)
          this.userservice.getMessageBetweenUsers(this.userId,this.recipientId).subscribe(
            res => {
              console.log(res)
              if(res != undefined && res != ''){
                this.isMessageExist=true
              }else{
                this.isMessageExist=false
                //console.log('DYN ATTR : '+dynamicAttr)
                //$('#msgList').prepend('<div '+dynamicAttr+'="" id="msgHover" class="d-flex bd-highlight" style="cursor: pointer;"><div '+dynamicAttr+'="" class="img_cont"><img '+dynamicAttr+'="" class="rounded-circle user_img ng-star-inserted" src="'+this.recipientImage+'"><span '+dynamicAttr+'="" class="online_icon"></span></div><div '+dynamicAttr+'="" class="user_info"><span '+dynamicAttr+'="">'+this.recipientUser.name+'</span><p '+dynamicAttr+'="">'+this.recipientUser.name+' is online</p></div></div>')
              }
      
            }
          )
          //$('#usersss').append('<div '+dynamicAttrKey+'="" class="d-flex justify-content-end mb-4 ng-star-inserted"><div '+dynamicAttrKey+'="" class="img_cont_msg"><img '+dynamicAttrKey+'="" src="'+this.currentUserImage+'" class="rounded-circle user_img_msg"></div><div '+dynamicAttrKey+'="" class="msg_cotainer"> '+this.messageDetail.content+' <span '+dynamicAttrKey+'="" class="msg_time">26/11/2022 18:37:32</span></div></div>');
          this.getUserImages()
          this.getMessages()
          this.getMessageDetails(this.userId,this.recipientId)
          this.messageDetail.content=''
          
      }
    );

    
  }
  else{
    if(this.uploadedImage != undefined){
      this.messageDetail.contentType=2
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    imageFormData.append('fromId', this.userId);
    imageFormData.append('toId', this.recipientId);
    this.userservice.uploadChatImage(imageFormData).subscribe(result => {
      console.log('Chat Image Uploaded')
      $("#msgCardBody").animate({
        scrollTop: $(
        '#msgCardBody').get(0).scrollHeight
        }, 1000);
        this.sendMessage(this.messageDetail.fromId.id,this.messageDetail.toId.id)
        //$('#usersss').append('<div '+dynamicAttrKey+'="" class="d-flex justify-content-end mb-4 ng-star-inserted"><div '+dynamicAttrKey+'="" class="img_cont_msg"><img '+dynamicAttrKey+'="" src="'+this.currentUserImage+'" class="rounded-circle user_img_msg"></div><div '+dynamicAttrKey+'="" class="msg_cotainer"> '+this.messageDetail.content+' <span '+dynamicAttrKey+'="" class="msg_time">26/11/2022 18:37:32</span></div></div>');
        this.getUserImages()
        this.getMessages()
        this.getMessageDetails(this.userId,this.recipientId)
        this.uploadedImage=undefined
    }
    )
  }
}
    }

    changeRecipientId(recipientId:any):any{
      console.log('CHANGE RECIPIENT CALLED : '+recipientId)
      this.userservice.getUser(recipientId).subscribe(data => {
        this.recipientUser = data;
        this.messageDetail.toId=this.recipientUser
        console.log('COMPLETED')
    });
    }

    getMessageDetails(userId:any,recipientId:any):any{
      console.log('GET MESSAGE DETAILS CALLED : BETWEEN : '+userId +'& '+recipientId)
      this.userservice.getInitialMessageDetails(userId,recipientId).subscribe(data => {
        this.messageDetails = data;
        console.log('COMPLETED')
        //if($("#msgCardBody") != undefined){
          let lowestId:number=this.maxMessageDetailId;
        this.messageDetails.forEach(msgDetail => {
      if(msgDetail.messageDetailId < lowestId){
        lowestId = msgDetail.messageDetailId
      }
      
  });
  this.lastReceivedMsgDtlId = lowestId
        console.log('lastReceivedMsgDtlId FROM ALL : '+this.lastReceivedMsgDtlId)
        if(this.lastReceivedMsgDtlId <= this.initialMsgDtlId){
          console.log('LOWEST ID : '+this.lastReceivedMsgDtlId)
          console.log('initialMsgDtlId ID : '+this.initialMsgDtlId)
          this.showProfileButton=true;
        }
        this.setTimerForNewMsg()
        $("#msgCardBody").animate({
          scrollTop: $(
          '#msgCardBody').get(0).scrollHeight
          }, 1000);
       // }
       this.readMessage(userId,recipientId) 
    });
    
    }
    searchUser(obj) { // appending the updated value to the variable
      this.text = obj.target.value;
      console.log('test : ' + this.text);
      if(obj.target.value != undefined && obj.target.value != ''){
      this.userservice.searchUsers(this.text,this.mailId).subscribe(data => {
        this.users = data;
        if(Object.keys(this.users).length !== 0 ){
        this.show=true;
        this.showNoMsg=false
        }
        else{
          this.show=false;
        }
        console.log('result : ' + this.users);
      });
    }
    else{
      this.show=false;
      this.showNoMsg=true
    }
      
      
    }

    gotoMessageDetails(userId:any,recipientId:any) {
      this.router.navigate([`/messages/${userId}/${recipientId}`]);
    }
    public onImageUpload(event) {
      this.uploadedImage = event.target.files[0];
    }

      public getMessages():any{
        this.userservice.getMessages(this.userId).subscribe(
          data => {
            console.log(data);
            this.messages=data;
            if(data.length == 0){
              this.showNoMsg=true
            }
            }
        );
      }
      public getUserImages():any{
        this.userservice.getMessagesAndImage(this.userId).subscribe(
          data => {
            console.log("Image Data : ");
            console.log(data)
            this.groupUserImages=data;
            }
        );
      }
      public getDynamicNgId():any{
        let dynamicAttrKey=''
        $('#usersss').each(function() {
          $.each(this.attributes, function() {
            // this.attributes is not a plain object, but an array
            // of attribute nodes, which contain both the name and value
            if(this.specified) {
          if(this.name.startsWith('_ng')){
              dynamicAttrKey=this.name
              return this.name
            }
            }
          });
        });
        return dynamicAttrKey
      }

      public setTimerForNewMsg(){
        setTimeout(()=>{
                this.classShowNewMsg=false
           }, 3000);
         this.classShowNewMsg=true
        }
  public loadNextMsgDetails(){
    //
    this.scrollDivHeight=$('#msgCardBody').prop("scrollHeight");
    let test=712
    console.log(this.scrollDivHeight);
    let scrollTop = $('#msgCardBody').scrollTop();
      if(scrollTop + $('#msgCardBody').innerHeight() >= $('#msgCardBody')[0].scrollHeight) {
          //alert('end reached');
      }else if(scrollTop <= 0){
        $('#msgCardBody').css('overflow-y', "hidden");
        this.displaySpinner=true
        var currentHeight = $('#msgdtl_'+this.lastReceivedMsgDtlId).scrollTop()
        console.log('CURRENT HEIGHT : '+currentHeight)
        this.userservice.getNextMessageDetails(this.userId,this.recipientId,this.lastReceivedMsgDtlId).subscribe(
          data => {
            if(data != '' && data != undefined && data.length != 0){
            this.currentMsgId = this.lastReceivedMsgDtlId
            console.log('Next Msg Details : '+data)
            this.afterMsgDetails = data;
            this.lastReceivedMsgDtlId = this.findMaxMsgDetailId(data)
            if(this.lastReceivedMsgDtlId <= this.initialMsgDtlId){
              this.showProfileButton=true
            }
            let clonedMessageDetail:MessageDetail[]= this.createCloneUsingLoDash(this.messageDetails)
            console.log('CLONED EXISTING MSG DTLS : ')
            console.log(clonedMessageDetail)
            this.messageDetails = this.mergeArrays(data,clonedMessageDetail)
            setTimeout(()=>{
              document.getElementById("msgdtl_"+this.currentMsgId).scrollIntoView({
                behavior: "auto",
                block: "start",
                inline: "nearest"
              });
              $('#msgCardBody').css('overflow-y', "auto");  
         }, 0);
            
            console.log('Setting scroll position to : '+this.currentMsgId);
            setTimeout(()=>{
              this.displaySpinner=false  
         }, 500);
           // this.scroller.scrollToAnchor("msgdtl_381");
            //this.router.navigate([], { fragment: "msgdtl_381" });
        }  else{
          this.displaySpinner=false
          $('#msgCardBody').css('overflow-y', "auto");  
        }
          }
          )
      }
      
  }      

  public findMaxMsgDetailId(messageDetails:MessageDetail[]):number{
    let lowestId:number=this.maxMessageDetailId;
    messageDetails.forEach(msgDetail => {
      if(msgDetail.messageDetailId < lowestId){
        lowestId = msgDetail.messageDetailId
      }
  });
  console.log('MAX MSG DETAIL ID : ' + lowestId)
    return lowestId;
  }

  public createClone(objs:any[]):any[]{
    let clonedArray = [];
    objs.forEach(val => clonedArray.push(Object.assign({}, val)));
    return objs
  }

  public createCloneUsingLoDash(objs:any[]):any[]{
    let clonedArray = _.cloneDeep(objs);
    //console.log('cloning full data')
    //console.log(clonedArray)
    return clonedArray
  }

  public mergeArrays(obj1:any[],obj2:any[]):any[]{
    let clonedArray = _.cloneDeep(obj1);
    console.log('Source 1')
    console.log(clonedArray)
    console.log('Source 2')
    console.log(obj2)
    obj2.forEach(
      val => clonedArray.push(Object.assign({}, val))
    )
    console.log('Merged Array')
    console.log(clonedArray)
    return clonedArray
  }

}