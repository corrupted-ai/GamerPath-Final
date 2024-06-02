import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export class Post {

  constructor(
    postinfo: string,
    userid: string,
    tags: string[],
  ) { }
}

export class User {

  constructor(

    gamertag: string,
    name: string,
    email: string,
    password: string,
    gender: string,
    securityquestion: string,
    securityanswer,
  ) { }
}


export class Reply {

  constructor(
    replyinfo: string,
  ) { }
}

export class Chatbox {

  constructor(
  ) { }
}

export class Message {

  constructor(
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  postid: string;
  post: Post;
  searchfromHome: string;
  userOneEmail: string;
  userTwoId: string;
  searchText: string;

  private baseurl = 'http://localhost:8080';

  constructor(private httpclient: HttpClient) { }

  getallposts() {
    return this.httpclient.get<Post[]>(this.baseurl + '/posts')
  }
  getpopularposts() {
    return this.httpclient.get<Post[]>(this.baseurl + '/posts/popular')
  }
  getpost(id: string) {
    return this.httpclient.get<Post>(this.baseurl + '/post/' + id)
  }
  newpost(id: string, p: Post) {
    console.log(p)
    return this.httpclient.post<Post>(this.baseurl + "/user/" + id + "/post/new", p)
  }
  getuserposts(id: string) {
    return this.httpclient.get<Post[]>(this.baseurl + "/user/" + id + "/posts")
  }
  getpopularuserposts(id: string) {
    return this.httpclient.get<Post[]>(this.baseurl + "/user/" + id + "/popularposts")
  }
  createUser(user) {
    return this.httpclient.post<User>(this.baseurl + "/user/new", user)
  }
  emailcheck(email: string) {
    return this.httpclient.get<Boolean>(this.baseurl + "/loginuseremail/" + email)
  }

  loginUser(details) {
    console.log(details)
    return this.httpclient.post<Boolean>(this.baseurl + "/user", details)
  }

  validateUser(email) {
    return this.httpclient.get<User>(this.baseurl + "/loginuser/" + email)
  }
  upvote(userid: string, pid: string) {
    return this.httpclient.post<Boolean>(this.baseurl + "/user/" + userid + "/upvote/" + pid, pid)
  }
  downvote(userid: string, pid: string) {
    return this.httpclient.post<Boolean>(this.baseurl + "/user/" + userid + "/downvote/" + pid, pid)
  }
  allreplies(pid: String) {
    return this.httpclient.get<Reply[]>(this.baseurl + '/post/' + pid + '/replys')
  }
  popularreplies(pid: string) {
    return this.httpclient.get<Reply[]>(this.baseurl + '/post/' + pid + '/popularreplys')
  }
  newreply(uid: string, pid: string, reply) {
    return this.httpclient.post<Reply>(this.baseurl + "/user/" + uid + "/post/" + pid + "/reply/new", reply)
  }
  upvotereply(userid: string, rid: string) {
    return this.httpclient.post<Boolean>(this.baseurl + "/user/" + userid + "/upvotereply/" + rid, rid)
  }
  downvotereply(userid: string, rid: string) {
    return this.httpclient.post<Boolean>(this.baseurl + "/user/" + userid + "/downvotereply/" + rid, rid)
  }
  searchName(sName) {
    return this.httpclient.get<User[]>(this.baseurl + "/users/search/" + sName)
  }

  addSentId(userOne, userTwo) {
    this.userOneEmail = userOne.email;
    this.userTwoId = userTwo.id;
    console.log("Add Sent Id Called")
    return this.httpclient.get<User>(this.baseurl + "/friends/" + this.userOneEmail + "/" + this.userTwoId)
  }

  fetchReq(reqId) {
    return this.httpclient.post<User[]>(this.baseurl + "/notifications", reqId)
  }

  approval(fndId) {
    return this.httpclient.post<User>(this.baseurl + "/notifications/accept", fndId)
  }

  uploadimagetopost(id: string, img) {
    const formdata: FormData = new FormData();
    formdata.append("image", img)
    return this.httpclient.post<Boolean>("http://localhost:8080/post/" + id + "/image/add", formdata)
  }
  uploadimagetouser(id: string, img) {
    const formdata: FormData = new FormData();
    formdata.append("image", img)
    return this.httpclient.post<Boolean>("http://localhost:8080/user/" + id + "/image/add", formdata)
  }

  getimage(id: string) {
    return this.httpclient.get<string>("http://localhost:8080/img/" + id)
  }
  decline(fndId) {
    return this.httpclient.post<User>(this.baseurl + "/notifications/decline", fndId)
  }
  searchNav(searchNav) {
    return this.httpclient.post<Post[]>(this.baseurl + "/search", searchNav)
  }
  getchatboxmessages(userid: string, friendid: String) {
    return this.httpclient.get<Message[]>(this.baseurl + "/chat/" + userid + "/" + friendid)
  }
  newchatboxmessage(uid: string, friendid: string, messageinfo: string) {
    console.log("here")
    return this.httpclient.post<Message[]>(this.baseurl + "/new/chat/" + uid + "/" + friendid + "/" + messageinfo, messageinfo)
  }

  getsortednewposts(filterId) {
    return this.httpclient.post<Post[]>(this.baseurl + "/search/new", filterId)
  }

  getsortedpopularposts(filterId) {
    return this.httpclient.post<Post[]>(this.baseurl + "/search/popular", filterId)
  }

  searchCat(text) {
    return this.httpclient.post<Post[]>(this.baseurl + "/category", text)
  }
  gettopusers(){
    return this.httpclient.get<User[]>(this.baseurl + "/users/top")
  }
  getuserbyid(id:string){
    return this.httpclient.get<User>(this.baseurl + "/user/"+id)
  }
  friendlist(listfriend){
    return this.httpclient.post<User[]>(this.baseurl + "/friendslist",listfriend)
  }
  
  removefriend(removelist){
    return this.httpclient.post<User>(this.baseurl + "/remove",removelist)
  }

  getgamertag(id:string){
    return this.httpclient.get<string>(this.baseurl+"/getgamertag/"+id)
  }
  getnotifications(id:string){
    return this.httpclient.get<Map<string,string>>(this.baseurl+"/chatnotifications/"+id)
  }
  removenotification(userid:string,friendid:string){
    return this.httpclient.get<boolean>(this.baseurl+"/removenotification/"+userid+"/remove/"+friendid)
  }






  
  report(pid:String){
    return this.httpclient.get<boolean>(this.baseurl+'/admin/'+pid)
   }
  
   getvposts() {
    return this.httpclient.get<Post[]>(this.baseurl + '/admin')
  }
  delete(rpost:String){
    console.log("delete")
    return this.httpclient.post<boolean>(this.baseurl + '/admin/post',rpost)
  }
}
