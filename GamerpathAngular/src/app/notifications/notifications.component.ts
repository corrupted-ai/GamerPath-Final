import { Component, OnInit } from '@angular/core';
import { Post, User, HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  loggedin: string
  user: User;

  sName: string
  searchResults: User[]
  selectUser: User
  disp: boolean = false
  friendid: string
  toggler: string = "false"
  notifUsers: User[]
  reqId: string[] = []
  fndId: string[] = []


  constructor(private http: HttpserviceService) { }

  ngOnInit() {
    this.loggedin = localStorage.getItem("loggedin")
    this.user = JSON.parse(localStorage.getItem("user"))
    console.log(this.user)
    console.log(this.loggedin)
    this.sName = this.http.searchfromHome
    this.searchName()
    this.tobe()
    this.fetchReq()
  }

  fetchReq() {
    console.log("Fetch Req Called")
    this.reqId = this.user["receive"]
    console.log(this.reqId)
    this.http.fetchReq(this.reqId).subscribe(response => this.notifDisp(response));
  }

  notifDisp(response) {

    this.notifUsers = response

  }

  acceptFn(id){
    this.fndId[0]= this.user["id"]
    this.fndId[1]= id
    console.log(this.fndId)
    this.http.approval(this.fndId).subscribe(response => this.newSetter(response) );
     this.fetchReq()
     window.location.reload();
  }

  declineFn(id){
    this.fndId[0]= this.user["id"]
    this.fndId[1]= id
    this.http.decline(this.fndId).subscribe(response => this.newSetter(response));
    this.fetchReq()
    window.location.reload();
  }


  searchName() {
    this.http.searchName(this.sName).subscribe(response => this.handle(response));
  }
  handle(response) {
    this.searchResults = response
  }

  dispResult(selUser) {
    this.disp = true
    this.selectUser = selUser
    console.log(selUser)
    console.log(this.selectUser)
    this.friendid = selUser["id"]
    this.tobe();
  }

  addfriend(userTwo) {
    this.http.addSentId(this.user, userTwo).subscribe(response => this.newSetter(response));

  }

  newSetter(response) {
    localStorage.setItem("user", JSON.stringify(response))
    this.user = JSON.parse(localStorage.getItem("user"))
    this.tobe()
  }
  tobe() {

    this.user["sent"].filter(u => u === this.friendid).forEach(data => {
      this.toggler = "true"
    })
    this.user["friends"].filter(u => u === this.friendid).forEach(data =>{
      this.toggler = "already"
    })
    this.user["receive"].filter(u => u === this.friendid).forEach(data =>{
      this.toggler = "received"
    })
  }
}
