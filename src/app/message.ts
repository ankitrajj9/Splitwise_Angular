import { User } from "./user"

export class Message {
    messageId:number
    partyA:User
    partyB:User
    createdOn:string
    updatedOn:string
}
