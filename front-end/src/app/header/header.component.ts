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

  public nextStack: string[] = [];
  public previousUrl = '';
  public title: string;
  constructor( private rightsService: RightsService, private navigation: NavigationService ) {
    this.navigation.nextStack$.subscribe((stack) => {
      this.nextStack = stack;
      console.log(this.nextStack);

    });
    console.log(this.nextStack);
    this.navigation.titleCurrentPage$.subscribe((newTitle) => {
        this.title = newTitle;
    });
    this.navigation.previousUrl$.subscribe((url) => {
      this.previousUrl = this.navigation.previousUrl;
      console.log(this.previousUrl);
    });

  }

  ngOnInit() {

  }

  /**
   * Active les droits d'administrateur (espace accompagnateur)
   */
  workspace() {
    this.rightsService.enableAdmin();
  }

  /**
   * Desactive les droits d'administrateur (espace jeu)
   */
  game() {
    this.rightsService.disableAdmin();
  }

  previous() {
      this.navigation.previous();
  }

  next() {
    this.navigation.next();
  }

}
