import { Component, OnInit } from '@angular/core';
import { HttpserviceService, Post, User } from '../httpservice.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loggedin: string
  user: User;
  profilepic: boolean;
  selectedfiles: FileList;
  img: File;
  uploaded:boolean=false;

  constructor(private http: HttpserviceService) { }

  ngOnInit() {
    this.profilepic = false;
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    if (this.user["image"] != null) {
      this.profilepic = true
      this.getimage();
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
  addimage() {
    if (this.img != undefined||this.img !=null) {
      this.http.uploadimagetouser(this.user["id"], this.img).subscribe()
      this.uploaded=true;
      this.selectedfiles = undefined;
    }
    
  }
  getimage() {
    this.http.getimage(this.user["image"]).subscribe(response => this.user["img"] = response["imagestring"])
  }
  
}
