import { Component } from '@angular/core';

// Gyro Functions
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
// Database 
import { AngularFireDatabase, AngularFireObject  } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  oX : any ;
  oY : any ;
  oZ : any ;
  oT : any ;
  oO : any ;
  watch : any;
  fn: string = 'None';
  items: any;
  itemRef: AngularFireObject<any>;

  constructor(private deviceMotion: DeviceMotion, public db: AngularFireDatabase,) { 
    // Initialize DB
    this.itemRef = db.object('movements');
    this.items = this.itemRef.valueChanges();
    this.itemRef.set({ x: 0, y: 0, z: 0, time: 0 });
  }

  updateValue(){
    this.itemRef.update({ x: 1 });
    this.itemRef.update({ y: 2 });
    this.itemRef.update({ z: 3 });
    this.itemRef.update({ time: 4 });
  }

  dMotionWatch(){
    var options : DeviceMotionAccelerometerOptions = {
      frequency : 200
    }
    this.watch = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.oO = acceleration; 
      // Get and UpdateValues
      this.oX = acceleration.x; this.itemRef.update({ x: acceleration.x });
      this.oY = acceleration.y; this.itemRef.update({ y: acceleration.y });
      this.oZ = acceleration.z; this.itemRef.update({ z: acceleration.z });
      this.oT = acceleration.timestamp; this.itemRef.update({ time: acceleration.timestamp });

      this.fn = "Device Motion";
    });
  }
  dMotionUnwatch(){
    this.watch.unsubscribe();
    this.fn = "Device Motion Clear";
  }

}
