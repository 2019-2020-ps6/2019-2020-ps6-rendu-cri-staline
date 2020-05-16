import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { RightsService } from './rights.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


private previousUrl: string;
private currentUrl: string;
private title: string;
private nextStack: string[] = [];
private previousStack: string[] = [];

public nextStack$: BehaviorSubject<string[]> = new BehaviorSubject(this.nextStack);
public previousStack$: BehaviorSubject<string[]> = new BehaviorSubject(this.previousStack);
public title$: BehaviorSubject<string> = new BehaviorSubject(this.title);


public nextStackState$: Subject<string[]> = new Subject();
public nextPreviousState$: Subject<string[]> = new Subject();
public titleCurrentPage$: Subject<string> = new Subject();

  constructor(private router: Router) {
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;

        }
      });
  }

  previous() {
      if (this.previousUrl !== undefined) {
      this.router.navigate([this.previousUrl]);
      this.addToNextStack();
      }
  }
  next() {
        if (this.nextStack.length > 0) {
            this.router.navigate([this.currentUrl]);
            this.nextStackState$.next(this.nextStack);
        }
  }

  addToNextStack() {
        this.nextStack.push(this.currentUrl);
        this.nextStackState$.next(this.nextStack);
  }

  isThereNextUrl() {
        if (this.nextStack.length > 0) {
            return true;
        }
        return false;
  }

  setTitle(str: string) {
      this.title = str;
      this.titleCurrentPage$.next(str);
  }


}
