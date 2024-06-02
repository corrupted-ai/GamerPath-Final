import { Component, OnInit } from '@angular/core';
import {HttpserviceService, User, Chatbox, Message} from '../httpservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  loggedin:string
  user:User;
  friendid:string;
  friendname:string;
  chatbox:Chatbox;
  messages:Message[];
  messageinfo:string="";
  empty:Boolean;
  userid:string;
  constructor(private http:HttpserviceService) { }
  
  ngOnInit() {
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    this.userid=this.user["id"];
    this.friendid=localStorage.getItem("chatid")
    this.http.getchatboxmessages(this.user["id"],this.friendid).subscribe(response=>this.chatting(response))
    
    this.empty=false
  }

  sendmessage(){
    if(this.messageinfo.length==0){
      this.empty=true;
    }
    else{
      this.empty=false;
      this.http.newchatboxmessage(this.user["id"],this.friendid,this.messageinfo).subscribe(response=>this.chatting(response))
      this.messageinfo=" "
    }
  }
  chatting(response){
    this.messages=response;
    this.http.getgamertag(this.friendid).subscribe(response=>this.friendgamertag(response))
  }
  friendgamertag(response){
    this.friendname=response[0];
  }

}
