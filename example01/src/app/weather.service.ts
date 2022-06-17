import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  getTemp(cityName:String) {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=90215b293f71489e6140b07dff1c867d&q=` + cityName;
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.http.get(url, options);
  }
}

