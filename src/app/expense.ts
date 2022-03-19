import { Group } from "./group"
import { User } from "./user"
import { UserExpense } from "./user-expense"

export class Expense {
    expenseId:number
    description:string
    amount : number
    group:Group
    user:User
    userExpenses?:UserExpense
}
