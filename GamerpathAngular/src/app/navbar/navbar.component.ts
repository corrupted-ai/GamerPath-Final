import { Component, OnInit } from '@angular/core';
import { HttpserviceService, User } from '../httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedin: string
  navSearch: string
  logoutuser:User=new User("","","","","","","");
  constructor(private http: HttpserviceService, private router:Router) { }

  ngOnInit() {
    this.loggedin = localStorage.getItem("loggedin")
  }

  searchPostsFn() {
    localStorage.setItem("navpostsearch","true")
    localStorage.setItem("postsearch",this.navSearch)
    this.router.navigate(['/filterposts'])
  }
  logout(){
    this.logoutuser["id"]="0"
    localStorage.setItem("loggedin","false")
    localStorage.setItem("user",JSON.stringify(this.logoutuser))
  }

}
