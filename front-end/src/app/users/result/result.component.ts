import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Result } from '../../../models/result.model';
import { Router } from '@angular/router';
import { RefereeService } from 'src/services/referee.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private router: Router,
              private refereeService: RefereeService) {

  }

  @Input()
  result: Result;

  /**
   * Valeur du score.
   */
  private value: number;

  /**
   * Reste du score.
   */
  private rest: number;

  ngOnInit() {
    this.value = this.result.score * 100;
    this.rest = 100 - this.value;

  }

  /**
   * Redirige vers la page détaillé du résultat..
   */
  display() {

    this.refereeService.setSelectedResult(this.result.id.toString());
    this.router.navigate(['users-list', this.result.userId, 'results', this.result.id]);
  }


}
