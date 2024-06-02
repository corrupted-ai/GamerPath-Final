import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category : string[] = ["Action","Adventure","Racing","Sports","MultiPlayer","Sci-fi",
                          "Co-op","Survival","Arcade","Classic","FPS","Fighting",
                        "MMORPG","Strategy","Superhero","Shooter","RPG","SinglePlayer"]
  constructor(private http : HttpserviceService, private router:Router) { }

  ngOnInit() {

  }

  searchCat(c){
    localStorage.setItem("catToggler","true")
    localStorage.setItem("category",c)
    this.router.navigate(['/filterposts'])
  }

}
