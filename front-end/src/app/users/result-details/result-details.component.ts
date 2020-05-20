import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Result } from '../../../models/result.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { RefereeService } from 'src/services/referee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss']
})
export class ResultDetailsComponent implements OnInit {


  /**
   * Résultat de l'utilisateur.
   */
  private result: Result;

  /**
   * L'tilisateur.
   */
  private user: User;

  /**
   * Valeur.
   */
  private value: number;

  /**
   * Identifiant de l'utilisateur.
   */
  private userId: string;

  constructor(private refereeService: RefereeService,
              private route: ActivatedRoute,
              private router: Router) {
      refereeService.resultSelected$.subscribe((rslt) => {
        this.result = rslt;
      });
  }

  ngOnInit() {
    this.user = this.refereeService.user;
    this.userId = this.route.snapshot.paramMap.get('userId');
  }


  /**
   * Redirige vers la page de l'utilisateur.
   */
  back() {
    this.router.navigate(['users-list', this.userId]);
  }

}
