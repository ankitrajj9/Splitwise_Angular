import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { Expense } from '../expense';
import { UserService } from '../user-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

import {User} from '../user'

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
group:Group;
id:number
mailId:string
jsonArray:any[]
userDetails:any=''
users: User[];
selectedUsers:User[]
expense:Expense
dropdownSettings:IDropdownSettings = {};
divHide=true
expenseDetails:any[]
totalBorrowedAmt:any=0
totalLendedAmt:any=0
totalExpenseByMe:any=0
settleUpDetails:any[]
settleUpRequestDetails:any[]
paymentDetails:any[]
divContent='Expense Added Successfully .'
saleData:any[]
pattern:number=1
buttonText:string
pieChartStyle:string
barChartStyle:string
myShareDetails:any[]
groupUserImages:any[]
hidden = false;
view:any

  toggleBadgeVisibility() {
    this.hidden = true;
  }

  constructor(private userService: UserService,private router: Router,private route:ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.group=new Group()
    this.changeChart()
    this.expense=new Expense()
    this.buttonText='Show Pie Chart'
    this.id = this.route.snapshot.params['groupId'];
    this.mailId=atob(this.route.snapshot.params['mailId']);
    this.userService.getGroupDetails(this.id,this.mailId).subscribe(data => {
      this.jsonArray=data;
      this.userDetails=data[0]
      this.group=data[1]
      this.expenseDetails=data[2]
      this.totalBorrowedAmt=data[3]
      this.totalLendedAmt=data[4]
      this.totalExpenseByMe=data[5]
      this.settleUpRequestDetails=data[6]
      this.paymentDetails=data[7]
      this.saleData=data[8]
      this.myShareDetails=data[9]
      console.log(data)
    });
    this.userService.getGroupUsers(this.id).subscribe(data => {
      
    this.removeById(data,this.mailId);
    this.users=data;
      console.log(data)
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.userService.getSettleUpDetails(this.id,this.mailId).subscribe(data => {
      this.settleUpDetails=data;
      console.log(data)
    });
    console.log('IMAGE START 1')
    this.userService.getGroupUserImages(this.id).subscribe(data => {
      console.log('IMAGE START 2')
      this.groupUserImages=data;
      console.log('IMAGE START 3')
      console.log(data)
    });
  }

  title = 'appBootstrap';
    
  closeResult: string = '';
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/

     
  /**
   * Write code on Method
   *
   * @return response()
   */
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
   arr = [
    {id: "1", name: "Snatch", type: "crime"},
    {id: "2", name: "Witches of Eastwick", type: "comedy"},
    {id: "3", name: "X-Men", type: "action"},
    {id: "4", name: "Ordinary People", type: "drama"},
    {id: "5", name: "Billy Elliot", type: "drama"},
    {id: "6", name: "Toy Story", type: "children"}
 ];
   removeById (arr, email) : boolean {
    let requiredIndex = arr.findIndex(el => {
       return el.email === String(email);
    });
    if(requiredIndex === -1){
       return false;
    };
    return !!arr.splice(requiredIndex, 1);
 };


  onSubmit() {
    this.userService.addExpense(this.expense,this.selectedUsers,this.id).subscribe(result => 
    {console.log('saved')
    console.log('expense details saved')
    this.modalService.dismissAll()
    
    this.addExpense()

    this.divHide=false
    this.setTimer()
  });
  }
  public setTimer(){
  setTimeout(()=>{
          this.divHide=true
     }, 5000);
   
  }
  public addExpense(){
    this.expense=new Expense()
    this.id = this.route.snapshot.params['groupId'];
    this.mailId=atob(this.route.snapshot.params['mailId']);
    this.userService.getGroupDetails(this.id,this.mailId).subscribe(data => {
      this.jsonArray=data;
      this.userDetails=data[0]
      this.group=data[1]
      this.expenseDetails=data[2]
      this.totalBorrowedAmt=data[3]
      this.totalLendedAmt=data[4]
      this.totalExpenseByMe=data[5]
      this.settleUpRequestDetails=data[6]
      this.paymentDetails=data[7]
      this.saleData=data[8]
      this.myShareDetails=data[9]
      console.log(data)
    });
    this.userService.getSettleUpDetails(this.id,this.mailId).subscribe(data => {
      this.settleUpDetails=data;
      console.log(data)
    });
  }

  public changeChart(){
    if(this.pattern == 1){
      this.pattern=2
      this.buttonText='Show Pie Chart'
      this.barChartStyle='margin-left: 150px;'
      this.pieChartStyle='display:none;'
    }
    else{
      this.buttonText='Show Bar Chart'
      this.pattern=1
      this.barChartStyle='display:none;'
      this.pieChartStyle='margin-left: 150px;'
    }
  }

  public getConfirm(toId:any,toName:any,amount:any,flag:any){
    /*Swal.fire('Any fool can use a computer')*/
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to do this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        
      if(flag != 0){
        var remarks = (<HTMLInputElement>document.getElementById(`id_${toId}`)).value;
          }
          else{
            var remarks=''
          }
        this.userService.settleUp(this.id,this.mailId,toId,amount,flag,remarks).subscribe(data => {
          console.log(data)
          this.modalService.dismissAll()
          
        this.addExpense()
        this.userService.getSettleUpDetails(this.id,this.mailId).subscribe(data => {
          this.settleUpDetails=data;
          console.log(data)
        });
        if(flag == 0){
        this.divContent=`You Have Initiated Settle Up Request With ${toName}`
        }
        else if(flag == 1){
          this.divContent=`You Are Settled Up With ${toName}`
        }
        else{
          this.divContent=`You Rejected Settle Up Request With ${toName}`
        }
        this.divHide=false
        this.setTimer()
        });
      }
    })
    
  }
  onResize(event) { this.view = [event.target.innerWidth - 500, 280 ]; }
}
