import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

/**
 * Url courante.
 */
private currentUrl: string;

/**
 * Url précédente.
 */
public previousUrl: string;

/**
 * Titre de la page actuelle.
 */
private title: string;

/**
 * Pile d'annulation.
 */
private nextStack: string[] = [];

/**
 * Observable qui contient la pile d'annulation.
 */
public nextStack$: BehaviorSubject<string[]> = new BehaviorSubject(this.nextStack);

/**
 * Observable qui contient le litre de la page.
 */
public title$: BehaviorSubject<string> = new BehaviorSubject(this.title);

/**
 * Observable qui contient l'url précédente.
 */
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

  /**
   * Redirige vers la derniere page.
   */
  previous() {
      if (this.previousUrl !== undefined) {
        this.addToNextStack(this.currentUrl);
        this.router.navigate([this.previousUrl]);

      }
  }

  /**
   * Défini la page précédente.
   * @param urlPath Url
   */
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

  /**
   * Redirige vers la page annulé.
   */
  next() {
        if (this.nextStack.length > 0) {
            this.router.navigate([this.nextStack.pop()]);
            this.nextStackState$.next(this.nextStack);
        }
  }

  /**
   * Ajout une url à la pile.
   * @param url Url
   */
  addToNextStack(url: string) {
        this.nextStack.push(url);
        this.nextStackState$.next(this.nextStack);
  }



  /**
   * Défini de nom de la page.
   * @param str Nom de la page
   */
  setTitle(str: string) {
      this.title = str;
      this.titleCurrentPage$.next(str);
  }


}
