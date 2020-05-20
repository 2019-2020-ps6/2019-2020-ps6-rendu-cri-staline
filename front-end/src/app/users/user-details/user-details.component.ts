import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import {Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user.service';
import { Result } from 'src/models/result.model';
import { Label } from 'ng2-charts';
import { NavigationService } from 'src/services/navigation.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  /**
   * L'utilisateur.
   */
  private user: User;

  /**
   * Identifiant de l'utilisateur.
   */
  private userId: string;

  /**
   * Données score.
   */
  private data: number[] = [];

  /**
   * Les labels des donnees de score.
   */
  private labels: Label[] = [];

  /**
   * Résultats de l'utilisateur.
   */
  private results: Result[] = [];

  /**
   * Nombre de données affichees.
   */
  private nbLabels = 7;



  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private navigationService: NavigationService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.results = this.user.results;
      if (this.results.length > 1) {
        this.compute();
      }
      this.navigationService.setTitle('Acceuilli ' + this.user.firstName + ' ' + this.user.lastName);
    });

    this.navigationService.setPreviousUrl(['users-list']);
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.userService.setSelectedUser(this.userId);
    this.navigationService.setTitle('Acceuilli ' + this.user.firstName + ' ' + this.user.lastName);
  }


  /**
   * Change l'ordre des résultats.
   * Le plus récent est le premier affiché.
   */
  changeOrderResults() {
    this.results = this.results.sort((a, b) => {
      const aTmp: Date = new Date(a.date);
      const bTmp: Date = new Date(b.date);
      return bTmp.getTime() - aTmp.getTime();
    });
  }

  /**
   * Prépare les données pour le graphe.
   * Le graphe a besoin d'au minimum deux résultats.
   */
  compute() {

    let dates: Date[];
    dates = [];
    this.results.forEach(element => {
      dates.push(new Date(element.date));
      this.data.push(element.score * 100);
    });
    dates = dates.sort((a, b) => a.getMilliseconds() - b.getMilliseconds());
    for (let i = 0; i < this.nbLabels; i++) {
      this.labels.push(dates[i].toUTCString());
    }
  }


}
