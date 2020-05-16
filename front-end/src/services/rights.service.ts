import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  bEnableAdmin: boolean;

  public enableAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(this.bEnableAdmin);

  public rightsSelected$: Subject<boolean> = new Subject();
  constructor() {
  }
  enableAdmin() {
    this.bEnableAdmin = true;
    this.rightsSelected$.next(this.bEnableAdmin);
  }
  disableAdmin() {
    this.bEnableAdmin = false;
    this.rightsSelected$.next(this.bEnableAdmin);
  }





}

