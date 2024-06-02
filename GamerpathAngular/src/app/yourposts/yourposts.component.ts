import { Component, OnInit } from '@angular/core';
import {HttpserviceService,Post, User} from '../httpservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-yourposts',
  templateUrl: './yourposts.component.html',
  styleUrls: ['./yourposts.component.css']
})
export class YourpostsComponent implements OnInit {
  loggedin:string
  user:User;
  posts:Post[]
  constructor(private http:HttpserviceService,private router: Router) { }
  ngOnInit() {
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    this.http.getuserposts(this.user["id"]).subscribe(
      response=>this.handleSuccessfulResponse(response)
    )
  }
  popular(){
    this.http.getpopularuserposts(this.user["id"]).subscribe(
      response=>this.handleSuccessfulResponse(response)
    )
  }
  newest(){
    this.http.getuserposts(this.user["id"]).subscribe(
      response=>this.handleSuccessfulResponse(response)
    )
  }
  handleSuccessfulResponse(response) {
    this.posts = response
    this.getimages();
    if(this.loggedin=="true"){this.do()}
  }
  tagname(tag:string){
    localStorage.setItem("catToggler","true")
    localStorage.setItem("category",tag)
    this.router.navigate(['/filterposts'])
  }
  do(){
    this.posts.forEach(p => {
      p["up"]="false"
      p["down"]="false"
    });
  
    this.posts.filter(p => p["upvoted"].indexOf(this.user["id"])>=0).forEach(pp =>{
      pp["up"]="true"
    })
    this.posts.filter(p => p["downvoted"].indexOf(this.user["id"])>=0).forEach(pp =>{
      pp["down"]="true"
    })
  }
  upvote(post){
    if(post["up"]=="true"){post["up"]="false",post["score"]=post["score"]-1;}
    else if(post["up"]=="false" && post["down"]=="true"){post["up"]="true";post["down"]="false";post["score"]=post["score"]+2}
    else if(post["up"]=="false"){post["up"]="true",post["score"]=post["score"]+1;console.log("executed")}
    this.http.upvote(this.user["id"],post["id"]).subscribe()
    console.log("up"+ post["up"] +"down"+ post["down"])
  }
  downvote(post){
    if(post["down"]=="true"){post["down"]="false",post["score"]=post["score"]+1}
    else if(post["down"]=="false" && post["up"]=="true"){post["down"]="true";post["up"]="false";post["score"]=post["score"]-2}
    else if(post["down"]=="false"){post["down"]="true",post["score"]=post["score"]-1}
    this.http.downvote(this.user["id"],post["id"]).subscribe()
  }
  getimages(){
    this.posts.filter(p=>p["image"]!=null).forEach(pp=>
    this.http.getimage(pp["image"]).subscribe(response=>pp["img"]=response["imagestring"]))
      
  }
  viewpost(p){
    localStorage.setItem("viewthread",JSON.stringify(p))
  }
  posteduser(id:string){
    localStorage.setItem("fromcontributor", "true")
    localStorage.setItem("contributorid", id)
    this.router.navigate(['/friends'])
  }


}
