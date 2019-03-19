import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Gyro Functions 
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

// Database
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
// Database for storing Axis
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, 'MVTrackerDB'),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Gyroscope,
    DeviceMotion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
