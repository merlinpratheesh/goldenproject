import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CARS ,UserdataService } from './service/userdata.service';

interface Car {
  id: number;
  profileName: string;
  email: string;
  gender: string;
  areaOfinterest: string;
  skills: string;
  location: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent  {
  cars: Car[] = CARS;
  car: FormGroup;

  editCar(car: Car) {
    this.car = new FormGroup({
      id: new FormControl(car.id),
      profileName: new FormControl(car.profileName),
      email: new FormControl(car.email),
      gender: new FormControl(car.gender),
      areaOfinterest: new FormControl(car.areaOfinterest),
      skills: new FormControl(car.skills),
      location: new FormControl(car.location)

    });
  }

  save() {
    let index = this.cars.findIndex(car => car.id === this.car.value.id);
    this.cars[index] = this.car.value;
    console.log(this.cars[index]);
  }

  cancel() {
    this.car = null;
  }
}
