import { GroupUsers } from "./group-users";
export class Group {
    groupId:number
    groupName:string
    createdOn?:string
    totalExpense:number
    totalUsers:number
    groupUsers?:GroupUsers[]
    createdBy:number
}
