import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTripPage } from './create-trip';

@NgModule({
  declarations: [
    CreateTripPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTripPage),
  ],
})
export class CreateTripPageModule {}
