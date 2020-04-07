import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent implements OnInit {

    constructor(private router: Router) {
    }
    ngOnInit() {
    }

    chooseMenu(chosenMenuName: string) {
        if (chosenMenuName === 'espaceAccompagnateur') {
             window.alert('Espace Accompagnateur');
            // this.router.navigate(['']);
        } else if (chosenMenuName === 'Jeu') {
            // window.alert('Espace Jeu');
            this.router.navigate(['quiz-list']);
        }
    }

  }
