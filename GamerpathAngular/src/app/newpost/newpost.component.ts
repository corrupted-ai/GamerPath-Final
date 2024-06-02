import { Component, OnInit } from '@angular/core';
import { HttpserviceService, Post, User } from '../httpservice.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  loggedin: string
  user: User;
  tags: string = "";
  posted: boolean = false;
  postinfo: boolean = false;
  post: Post = new Post("", "", []);
  selectedfiles: FileList;
  img: File;
  postid:string;
  constructor(private http: HttpserviceService,private router: Router) { }

  ngOnInit() {
    this.posted = false;
    this.postinfo = false;
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    this.post["userid"] = this.user["id"]
  }
  addpost() {
    if (this.post["postinfo"] == null) {
      console.log("executed first if")
      this.postinfo = true
    }
    else {
      console.log(this.post["postinfo"])
      this.postinfo = false;
      this.post["tags"] = this.tags.split(",")
      this.http.newpost(this.user["id"], this.post).subscribe(response=>this.uploadimagetoreply(response))
      this.posted = true;
      $("#newpostform").trigger("reset")
    }
  }
  selectfile(event) {
    const file = event.target.files.item(0);
    if (file.type.match('image.*')) {
      this.selectedfiles = event.target.files;
      this.img = this.selectedfiles.item(0);
    } else {
      alert('invalid format!');
    }
  }
  uploadimagetoreply(response){
      if(this.img!=undefined){
      this.postid=response["id"]
      console.log(this.postid)
      this.http.uploadimagetopost(this.postid,this.img).subscribe()
      this.selectedfiles = undefined;}
  }

}
