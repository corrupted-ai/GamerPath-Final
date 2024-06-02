import { Component, OnInit } from '@angular/core';
import { HttpserviceService,User } from '../httpservice.service';
import { Router } from '@angular/router'
declare var $:any;
@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.css']
})
export class LoginsignupComponent implements OnInit {

  gender:string
  loginEmail : string
  loginPassword : string
  login : string[] = []
  loginerror : boolean = false
  signuperror : boolean = false
  user : User = new User("","","","","","","")

  constructor(private httpService : HttpserviceService,private router : Router) { }

  ngOnInit() {}

   change(input:string){
     this.gender=input
  }

createUser() : void{
  this.user["gender"]=this.gender
  this.httpService.emailcheck(this.user["email"]).subscribe(response => this.emailResponse(response))
  
}
 
loginUser(): void{
   this.login[0] = this.loginEmail
   this.login[1] = this.loginPassword
   this.httpService.loginUser(this.login).subscribe(response => this.successResponse(response));

}

successResponse(response){
  console.log("Success Response")
  if(response){
    this.httpService.validateUser(this.loginEmail).subscribe(response => this.handleResponse(response));
  }
  else{
    console.log("Toggle")
    this.loginerror = true;
    console.log(this.loginerror)
    $("#loginform").trigger("reset")
  }
}
emailResponse(response){
  console.log("email Response")
  if(response){
    this.httpService.createUser(this.user).subscribe(response => this.handleResponse(response));
  }
  else{
    console.log("Toggle")
    this.signuperror = true;
    console.log(this.signuperror)
  }
}
handleResponse(response){
  console.log("Handle Response")
  localStorage.setItem("user",JSON.stringify(response))
  localStorage.setItem("loggedin","true")
  this.router.navigate(['/homepage'])
}

}
