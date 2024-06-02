import { Component, OnInit } from '@angular/core';
import { User, Post, HttpserviceService } from '../httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navchat',
  templateUrl: './navchat.component.html',
  styleUrls: ['./navchat.component.css']
})
export class NavchatComponent implements OnInit {

  loggedin: string
  user: User;
  notifications: Map<string, string> = new Map();
  array: string[] = []


  constructor(private http: HttpserviceService, private router: Router) { }

  ngOnInit() {
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    this.http.getnotifications(this.user["id"]).subscribe(response => this.notificationresposne(response))
  }
  notificationresposne(response) {
    for (var key in response) {
      if (response.hasOwnProperty(key)) {
        this.notifications.set(key,response[key])
      }
    }
  }
  chat(id: string) {
    localStorage.setItem("chatid", id);
    this.http.removenotification(this.user["id"],id).subscribe()
  }


}
