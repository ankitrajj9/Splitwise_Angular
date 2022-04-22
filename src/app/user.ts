import { UserHobby } from "./user-hobby";


export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    dateOfBirth:String
    hobbies:UserHobby[];
    cstatus:number
    isExternal:number
}