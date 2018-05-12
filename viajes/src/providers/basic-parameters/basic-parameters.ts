
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs'

/*
  Generated class for the BasicParametersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BasicParametersProvider {

private missionConfirmedSource = new Subject<any>();
	missionAnnounced$ = this.missionConfirmedSource.asObservable();

  constructor() {
    console.log('Hello BasicParametersProvider Provider');
  }

   confirmMission(astronaut: any) {
    this.missionConfirmedSource.next(astronaut);
  }

}
