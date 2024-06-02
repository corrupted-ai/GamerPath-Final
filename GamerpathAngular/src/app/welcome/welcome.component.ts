import { Component, OnInit } from '@angular/core';
import {HttpserviceService, User} from '../httpservice.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user:User;
  constructor(private http:HttpserviceService) { }

  ngOnInit() {    
    localStorage.setItem("loggedin","false")
  }

}
