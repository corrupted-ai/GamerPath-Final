import { Component, OnInit } from '@angular/core';
import { User, Post, HttpserviceService } from '../httpservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  loggedin: string
  user: User;
  sName: string;
  posts: Post[]
  listfriend: string[] = []
  friends: User[]
  removelist: string[] = []

  constructor(private http: HttpserviceService, private router: Router) { }

  ngOnInit() {
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    this.listfriend = this.user["friends"]
    this.http.friendlist(this.listfriend).subscribe(response => this.handle(response))
  }

  handle(response) {
    this.friends = response
  }

  removefriend(idTwo) {
    this.removelist[0] = this.user["id"]
    this.removelist[1] = idTwo
    this.http.removefriend(this.removelist).subscribe(response => localStorage.setItem("user", JSON.stringify(response)))
    window.location.reload();
  }

  searchName() {
    console.log("Search Results")
    this.http.searchfromHome = this.sName;
  }
  chat(id: string) {
    localStorage.setItem("chatid", id)
  }
}
