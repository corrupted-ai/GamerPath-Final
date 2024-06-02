import { Component, OnInit } from '@angular/core';
import { HttpserviceService, Post, User } from '../httpservice.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-filterposts',
  templateUrl: './filterposts.component.html',
  styleUrls: ['./filterposts.component.css']
})
export class FilterpostsComponent implements OnInit {

  loggedin: string
  user: User;
  sName: string;
  posts: Post[]
  searchText: string;
  searchcat:string;
  filterId: string[] = []
  constructor(private http: HttpserviceService,private router: Router) { }

  ngOnInit() {
    this.posts=[]
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    if (localStorage.getItem("navpostsearch") == "true") {
      this.searchText = localStorage.getItem("postsearch");
      this.http.searchNav(this.searchText).subscribe(response => this.handleSuccessfulResponse(response))
      localStorage.setItem("navpostsearch","false")
    }
    if (localStorage.getItem("catToggler") == "true") {
      console.log("searchcatergory")
      localStorage.setItem("catToggler","false")
      this.searchcat = localStorage.getItem("category")
      console.log(this.searchcat)
      this.http.searchCat(this.searchcat).subscribe(response => this.handleSuccessfulResponse(response))
    }
  }

  handleSuccessfulResponse(response) {
    this.posts = response
    this.getimages();
    if (this.loggedin == "true") { this.do() }
  }
  tagname(tag:string){
    console.log("search tagname")
    localStorage.setItem("catToggler","true")
    localStorage.setItem("category",tag)
    this.router.navigate(['/filterposts'])
  }

  newest() {
    console.log(this.posts)
    this.posts.forEach(p => {
      this.filterId
    });
    this.http.getsortednewposts(this.filterId).subscribe(response =>
      this.handleSuccessfulResponse(response))
  }


  popular() {
    this.posts.forEach(p => {
      this.filterId.push(p["id"])
      console.log(p["id"])
    });
    this.http.getsortedpopularposts(this.filterId).subscribe(response =>
      this.handleSuccessfulResponse(response))
  }

  do() {
    this.posts.forEach(p => {
      p["up"] = "false"
      p["down"] = "false"
    });

    this.posts.filter(p => p["upvoted"].indexOf(this.user["id"]) >= 0).forEach(pp => {
      pp["up"] = "true"
    })
    this.posts.filter(p => p["downvoted"].indexOf(this.user["id"]) >= 0).forEach(pp => {
      pp["down"] = "true"
    })
  }
  upvote(post) {
    if (post["up"] == "true") { post["up"] = "false", post["score"] = post["score"] - 1; }
    else if (post["up"] == "false" && post["down"] == "true") { post["up"] = "true"; post["down"] = "false"; post["score"] = post["score"] + 2 }
    else if (post["up"] == "false") { post["up"] = "true", post["score"] = post["score"] + 1; console.log("executed") }
    this.http.upvote(this.user["id"], post["id"]).subscribe()
    console.log("up" + post["up"] + "down" + post["down"])
  }
  downvote(post) {
    if (post["down"] == "true") { post["down"] = "false", post["score"] = post["score"] + 1 }
    else if (post["down"] == "false" && post["up"] == "true") { post["down"] = "true"; post["up"] = "false"; post["score"] = post["score"] - 2 }
    else if (post["down"] == "false") { post["down"] = "true", post["score"] = post["score"] - 1 }
    this.http.downvote(this.user["id"], post["id"]).subscribe()
  }
  viewpost(p) {
    localStorage.setItem("viewthread", JSON.stringify(p))
  }
  posteduser(id: string) {
    localStorage.setItem("fromcontributor", "true")
    localStorage.setItem("contributorid", id)
    this.router.navigate(['/friends'])
  }
  getimages(){
    this.posts.filter(p=>p["image"]!=null).forEach(pp=>
    this.http.getimage(pp["image"]).subscribe(response=>pp["img"]=response["imagestring"]))
    this.http.validateUser(this.user["email"]).subscribe(response=>localStorage.setItem("user",JSON.stringify(response)))
  }

}
