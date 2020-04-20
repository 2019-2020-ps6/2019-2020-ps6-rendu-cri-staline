import { Component, OnInit } from '@angular/core';
import {RightsService} from '../../services/rights.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private rightsServie: RightsService) {

  }

  ngOnInit() {
  }

  workspace() {
    this.rightsServie.enableAdmin();
  }
  game() {
    this.rightsServie.disableAdmin();
  }

}
