import { Component, OnInit } from '@angular/core';
import { CovidApiServiceService } from '../covid-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  worldData: any;
  countriesList: [];
  flags: any = {};

  constructor(public service: CovidApiServiceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initiate();
    this.getWorldData();
  }

  initiate(): void {
    window.onload = function () {
      document.querySelector(".text").classList.add("spaced");
    };
  }

  getWorldData() {
    this.flags.isWorldDataLoaded = false;
    this.flags.isError = false;
    this.service.getWorldData().subscribe((data: {}) => {
      this.worldData = data;
      this.countriesList = this.worldData['countries_stat'];
      this.countriesList.splice(82, 1);
      this.flags.isWorldDataLoaded = true;
    }, (error) => {
      this.flags.isError = true;
    });
  }
}
