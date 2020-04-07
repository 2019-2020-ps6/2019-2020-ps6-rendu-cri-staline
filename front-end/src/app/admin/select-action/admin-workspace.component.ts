import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-workspace',
  templateUrl: './admin-workspace.component.html',
  styleUrls: ['./admin-workspace.component.scss']
})
export class AdminWorkspaceComponent implements OnInit {


  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  selectAddingUser() {
    this.router.navigate(['user-add']);
  }

}
