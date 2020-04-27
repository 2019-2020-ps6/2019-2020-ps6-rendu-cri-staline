import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {


  constructor(private router: Router) {

  }

  ngOnInit() {

  }



}
