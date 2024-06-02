import { Component, OnInit } from '@angular/core';
import {HttpserviceService,Post, User,Reply} from '../httpservice.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-viewthread',
  templateUrl: './viewthread.component.html',
  styleUrls: ['./viewthread.component.css']
})
export class ViewthreadComponent implements OnInit {
  replies:Reply[];
  loggedin:string
  user:User;
  post:Post;
  replyinfo:Boolean = false
  replied:Boolean = false
  reply:Reply=new Reply("");
  image:string;
  constructor(private http:HttpserviceService,private router: Router) { }
  ngOnInit() {
    this.replyinfo = false
    this.replied= false
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    this.post = JSON.parse(localStorage.getItem("viewthread"))
    this.http.allreplies(this.post["id"]).subscribe(
      response=>this.handleSuccessfulResponse(response)
    )
     if(this.post["image"]!=null){
      this.getimage();
    } 
  }
  popular(){
    this.http.popularreplies(this.post["id"]).subscribe(
      response=>this.handleSuccessfulResponse(response)
    )
  }
  newest(){
    this.http.allreplies(this.post["id"]).subscribe(
      response=>this.handleSuccessfulResponse(response)
    )
  }
  handleSuccessfulResponse(response) {
    this.replies = response
    if(this.loggedin=="true"){this.do()}
  }
  tagname(tag:string){
    localStorage.setItem("catToggler","true")
    localStorage.setItem("category",tag)
    this.router.navigate(['/filterposts'])
  }
  do(){
    this.replies.forEach(p => {
      p["up"]="false"
      p["down"]="false"
    });
  
    this.replies.filter(p => p["upvoted"].indexOf(this.user["id"])>=0).forEach(pp =>{
      pp["up"]="true"
    })
    this.replies.filter(p => p["downvoted"].indexOf(this.user["id"])>=0).forEach(pp =>{
      pp["down"]="true"
    })
  }
  upvote(reply){
    if(reply["up"]=="true"){reply["up"]="false",reply["score"]=reply["score"]-1;}
    else if(reply["up"]=="false" && reply["down"]=="true"){reply["up"]="true";reply["down"]="false";reply["score"]=reply["score"]+2}
    else if(reply["up"]=="false"){reply["up"]="true",reply["score"]=reply["score"]+1}
    this.http.upvotereply(this.user["id"],reply["id"]).subscribe()
  }
  downvote(reply){
    if(reply["down"]=="true"){reply["down"]="false",reply["score"]=reply["score"]+1}
    else if(reply["down"]=="false" && reply["up"]=="true"){reply["down"]="true";reply["up"]="false";reply["score"]=reply["score"]-2}
    else if(reply["down"]=="false"){reply["down"]="true",reply["score"]=reply["score"]-1}
    this.http.downvotereply(this.user["id"],reply["id"]).subscribe()
  }

  upvotepost(post){
    if(post["up"]=="true"){post["up"]="false",post["score"]=post["score"]-1;}
    else if(post["up"]=="false" && post["down"]=="true"){post["up"]="true";post["down"]="false";post["score"]=post["score"]+2}
    else if(post["up"]=="false"){post["up"]="true",post["score"]=post["score"]+1}
    this.http.upvote(this.user["id"],post["id"]).subscribe()

  }
  downvotepost(post){
    if(post["down"]=="true"){post["down"]="false",post["score"]=post["score"]+1}
    else if(post["down"]=="false" && post["up"]=="true"){post["down"]="true";post["up"]="false";post["score"]=post["score"]-2}
    else if(post["down"]=="false"){post["down"]="true",post["score"]=post["score"]-1}
    this.http.downvote(this.user["id"],post["id"]).subscribe()
  }
  addreply(){
    if (this.reply["replyinfo"]==null){
      this.replyinfo=true
    }
    else{
    this.replyinfo=false;
    this.http.newreply(this.user["id"],this.post["id"],this.reply).subscribe();
    this.replied=true;
    $("#newreplyform").trigger("reset")
    }
  }
  refresh(){
    location.reload()
  }
  getimage(){
    this.http.getimage(this.post["image"]).subscribe(response=>this.pic(response))
  }
  pic(response){
    this.image=response["imagestring"]
  }
  posteduser(id:string){
    localStorage.setItem("fromcontributor", "true")
    localStorage.setItem("contributorid", id)
    this.router.navigate(['/friends'])
  }


}
