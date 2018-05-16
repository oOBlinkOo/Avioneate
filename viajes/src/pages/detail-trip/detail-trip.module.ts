import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTripPage } from './detail-trip';

@NgModule({
  declarations: [
    DetailTripPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailTripPage),
  ],
})
export class DetailTripPageModule {}
