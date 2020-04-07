import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router } from '@angular/router';
import { RightsService } from 'src/services/rights.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent implements OnInit {


    constructor(private router: Router, private rightService: RightsService) {

    }
    ngOnInit() {
    }

    selectWorkspace() {
      this.rightService.enableAdmin();
      this.router.navigate(['workspace']);
    }

    selectGamespace() {
      this.rightService.disableAdmin();
      this.router.navigate(['users-list']);
    }

  }
