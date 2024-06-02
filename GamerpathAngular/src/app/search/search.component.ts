import { Component, OnInit } from '@angular/core';
import {HttpserviceService} from '../httpservice.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sName:string;
  constructor(private http:HttpserviceService) { }

  ngOnInit() {
  }
  searchName(){
    localStorage.setItem("search",this.sName)
    $("#searchform").trigger("reset");
  }

}
