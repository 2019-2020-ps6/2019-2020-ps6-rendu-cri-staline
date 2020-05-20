import { Component, OnInit } from '@angular/core';
import {RightsService} from '../../services/rights.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Pile d'annulation.
   */
  public nextStack: string[] = [];

  /**
   * Url précédente.
   */
  public previousUrl = '';

  /**
   * Titre de la page.
   */
  public title: string;

  constructor( private rightsService: RightsService,
               private navigation: NavigationService ) {
    this.navigation.nextStack$.subscribe((stack) => {
      this.nextStack = stack;
    });
    this.navigation.titleCurrentPage$.subscribe((newTitle) => {
        this.title = newTitle;
    });
    this.navigation.previousUrl$.subscribe((url) => {
      this.previousUrl = this.navigation.previousUrl;
    });

  }

  ngOnInit() {

  }

  /**
   * Active les droits d'administrateur.
   */
  workspace() {
    this.rightsService.enableAdmin();
  }

  /**
   * Desactive les droits d'administrateur.
   */
  game() {
    this.rightsService.disableAdmin();
  }

  /**
   * Redirige vers l'url précédente.
   */
  previous() {
      this.navigation.previous();
  }

  /**
   * Redirige vers l'url suivante.
   */
  next() {
    this.navigation.next();
  }

}
