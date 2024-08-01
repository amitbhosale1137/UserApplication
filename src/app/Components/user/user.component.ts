import { Component, inject, OnInit } from '@angular/core';
import { UserModel } from '../../Model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user : UserModel ={
    department:"",
    name:"",
    mobile:"",
    email:"",
    gender:"",
    doj:"",
    city:"",
    salary:0,
    address:"",
    status:false

  }

  cityList:string[]=['Pune','Latur','Mumbai','Goa'];
  deptList:string[]=['IT','Sale','Food','Electricity'];

  editMode :boolean =false;

  userservice= inject(UserService);
  toastrService = inject(ToastrService);

  userList: UserModel[]=[];

  ngOnInit(): void {
    this.getUserList();
      
  }

  getUserList()
  {
    this.userservice.getUsers().subscribe((res)=>{

      this.userList = res;

    })

  }

  
  
  onSubmit(form: NgForm){
    debugger;

    if(this.editMode){
      this.userservice.updateUser(this.user).subscribe((res)=>{
        this.getUserList();
        form.reset();
        this.toastrService.success('User updated successfully',"Success");
        this.editMode =false;
  
      });

    }
    else{
      this.userservice.addUser(this.user).subscribe((res)=>{
        this.getUserList();
        form.reset();
        this.toastrService.success('User added successfully',"Success");
  
      });
    }

    

  }

  onReset(){
    
  }
  onEdit(userData: UserModel){
    this.user = userData;
    this.editMode =true;

  }
  onDelete(id: any){
    const isConfirm = confirm('Are you sure want to delete this user?');

    if(isConfirm){
      this.userservice.deleteUser(id).subscribe((res)=>{
        this.toastrService.error('User deleted successfully',"Deleted");
        this.getUserList(); 
      });

    }


    

  }

}
