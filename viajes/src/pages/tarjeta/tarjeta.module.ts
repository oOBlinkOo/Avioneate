import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarjetaPage } from './tarjeta';

@NgModule({
  declarations: [
    TarjetaPage,
  ],
  imports: [
    IonicPageModule.forChild(TarjetaPage),
  ],
})
export class TarjetaPageModule {}
