import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  arrTemp:any;
  cityName:String = '';



  constructor(private weatherService:WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getTemp(this.cityName).subscribe(data=>{
      console.log(data);
      this.arrTemp = data;
    });
  }

  changeCity() {
    this.weatherService.getTemp(this.cityName).subscribe(data=>{
      console.log(data);
      this.arrTemp = data;
    });
  }

  getMessage() {
   return this.cityName === '' ?  'Enter Your city name' : this.cityName +' now is '+this.arrTemp.main.temp;
  }

}

