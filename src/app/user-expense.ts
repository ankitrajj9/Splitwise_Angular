import { Expense } from "./expense"
import { Group } from "./group"
import { User } from "./user"

export class UserExpense {
    userExpenseId:number
    expense:Expense
    createdBy:User
    userId:User
    amount:number
    group:Group
    createdOn:string
}
