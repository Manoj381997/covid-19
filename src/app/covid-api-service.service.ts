import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";


const BASE_ENDPOINT_URL = 'https://corona-virus-world-and-india-data.p.rapidapi.com/';

@Injectable({
  providedIn: 'root'
})
export class CovidApiServiceService {

  constructor(private http: HttpClient) { }

  getWorldData() {
    return this.http.get(BASE_ENDPOINT_URL+"api", {
      headers: {
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
        "x-rapidapi-key": "7535e28117msh786faff26f9af28p116b16jsn23ae3893005c"
      }
    });
  }

  getIndiaData() {
    return this.http.get(BASE_ENDPOINT_URL+"api_india", {
      headers: {
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
        "x-rapidapi-key": "7535e28117msh786faff26f9af28p116b16jsn23ae3893005c"
      }
    });
  }

  getIndiaTimelineData() {
    return this.http.get(BASE_ENDPOINT_URL+"api_india_timeline", {
      headers: {
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
        "x-rapidapi-key": "7535e28117msh786faff26f9af28p116b16jsn23ae3893005c"
      }
    });
  }
}
