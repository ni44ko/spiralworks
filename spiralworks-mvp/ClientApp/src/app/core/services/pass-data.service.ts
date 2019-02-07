import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

 // public isPerPost: Subject = new BehaviorSubject<boolean>(false);

constructor() { }

  //Detects whether Angular is in development mode.  
  //Created a function so that isDevMode() is called later (most importantly after enableProdMode() is called) when it is actually used in the code.
  isInDevMode(): boolean {
    return isDevMode();
  }
}
