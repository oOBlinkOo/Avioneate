import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterAccountPage } from './register-account';

@NgModule({
  declarations: [
    RegisterAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterAccountPage),
  ],
})
export class RegisterAccountPageModule {}
