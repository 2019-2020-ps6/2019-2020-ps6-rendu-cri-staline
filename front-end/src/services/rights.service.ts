import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  /**
   * Droit de modification.
   */
  private bEnableAdmin: boolean;

  /**
   * Observable qui contient le droit de modification.
   */
  public enableAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(this.bEnableAdmin);

  constructor() {}

  /**
   * Active les droits de modification.
   */
  enableAdmin() {
    this.enableAdmin$.next(true);
  }
  /**
   * Desactive les droits de modification.
   */
  disableAdmin() {
    this.enableAdmin$.next(false);
  }





}

