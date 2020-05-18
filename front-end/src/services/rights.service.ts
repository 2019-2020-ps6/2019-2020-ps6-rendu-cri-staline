import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  private bEnableAdmin: boolean;

  public enableAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(this.bEnableAdmin);

  constructor() {
  }
  enableAdmin() {
    this.enableAdmin$.next(true);
  }
  disableAdmin() {
    this.enableAdmin$.next(false);
  }





}

