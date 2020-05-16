import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { RightsService } from './rights.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

private currentUrl: string;
public previousUrl: string;
private title: string;
private nextStack: string[] = [];

public nextStack$: BehaviorSubject<string[]> = new BehaviorSubject(this.nextStack);
public title$: BehaviorSubject<string> = new BehaviorSubject(this.title);
public previousUrl$: BehaviorSubject<string> = new BehaviorSubject(this.previousUrl);

public nextStackState$: Subject<string[]> = new Subject();
public titleCurrentPage$: Subject<string> = new Subject();
public previousUrlState$: Subject<string> = new Subject();

  constructor(private router: Router) {
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url;
        }
      });
  }

  previous() {
      console.log(this.previousUrl);
      if (this.previousUrl !== undefined) {
        this.addToNextStack(this.currentUrl);
        this.router.navigate([this.previousUrl]);

      }
  }

  setPreviousUrl(urlPath: string[]) {
    let url = '';
    for (let i = 0; i < urlPath.length; i++) {
        if (i !== urlPath.length - 1) {
            url += urlPath[i] + '/';
        } else {
            url += urlPath[i];
        }
    }
    this.previousUrl = url;
    this.previousUrl$.next(this.previousUrl);
  }

  next() {
        if (this.nextStack.length > 0) {
            console.log(this.nextStack);
            this.router.navigate([this.nextStack.pop()]);
            this.nextStackState$.next(this.nextStack);
        }
  }

  addToNextStack(url: string) {
        this.nextStack.push(url);
        this.nextStackState$.next(this.nextStack);
  }



  setTitle(str: string) {
      this.title = str;
      this.titleCurrentPage$.next(str);
  }


}
