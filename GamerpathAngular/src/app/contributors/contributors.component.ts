import { Component, OnInit } from '@angular/core';
import { User, HttpserviceService } from '../httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {

  users: User[]
  constructor(private http: HttpserviceService, private router: Router) { }

  ngOnInit() {
    this.http.gettopusers().subscribe(response => this.handleSuccessfulResponse(response))
  }

  handleSuccessfulResponse(response) {
    this.users = response
  }
  search(id: string) {
    localStorage.setItem("fromcontributor", "true")
    localStorage.setItem("contributorid", id)
    this.router.navigate(['/friends'])
  }



}
