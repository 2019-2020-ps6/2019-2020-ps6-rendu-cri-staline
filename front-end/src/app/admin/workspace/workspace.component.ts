import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {


  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  addingUser() {
    this.router.navigate(['user-add']);
  }

  usersList() {
    this.router.navigate(['users-list']);
  }

  addingTheme() {
    this.router.navigate(['theme-add']);
  }

}
