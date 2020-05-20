import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router } from '@angular/router';
import { RightsService } from 'src/services/rights.service';
import { NavigationService } from 'src/services/navigation.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent implements OnInit {


    constructor(private router: Router,
                private rightService: RightsService,
                private navigationService: NavigationService) {
      this.navigationService.setTitle('Acceuil');
      this.navigationService.setPreviousUrl(['']);

    }
    ngOnInit() {
    }

  /**
   * Redirige vers l'espace accompagnateur.
   * Active les droits d'administrateur.
   */
  workspace() {
      this.rightService.enableAdmin();
      this.router.navigate(['workspace']);
    }

  /**
   * Redirige vers l'espace jeu.
   * Desactive les droits d'administrateur.
   */
  game() {
      this.rightService.disableAdmin();
      this.router.navigate(['users-list']);
    }

  }
