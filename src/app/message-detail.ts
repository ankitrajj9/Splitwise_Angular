
import { User } from "./user";

export class MessageDetail {
    messageDetailId:number
    fromId:User
    toId:User
    content:string
    contentType:number
    createdOn:string
    image:File
    isRead:number
}
