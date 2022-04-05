import { UserHobby } from "./user-hobby";


export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    age:number;
    hobbies:UserHobby[];
    cstatus:number
    isExternal:number
}