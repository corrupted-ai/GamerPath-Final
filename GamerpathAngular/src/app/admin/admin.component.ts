import { Component, OnInit } from '@angular/core';
import {HttpserviceService,Post, User} from '../httpservice.service';
import { callbackify } from 'util';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  loggedin:string
  posts:Post[]
  constructor(private http:HttpserviceService) { }

   ngOnInit() {
    this.loggedin = localStorage.getItem("loggedin")
    if(this.loggedin="true"){
     this.http.getvposts().subscribe(
      response=>this.handleSuccessfulResponse(response)
    )
  }}
  handleSuccessfulResponse(response) {
    this.posts = response
  }
  mostreported(){
    this.http.getpopularposts().subscribe(
      response=>this.handleSuccessfulResponse(response)
    )}
  recentlyreported(){
    
  }
  
  // report(pid){
  //   this.http.report(pid).subscribe(
  //     response=>this.handleSuccessfulResponse(response)
  //   )
  // }

  vpost(p){
    localStorage.setItem("viewthread",JSON.stringify(p))
  }
  delete(pid:String) {
    this.http.delete(pid).subscribe(
      response=>console.log(response)
    
    );
    window.location.reload();
 
  }

}
