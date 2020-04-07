import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
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

  selectAddingUser() {
    this.router.navigate(['user-add']);
  }

  selectUsersList() {
    this.router.navigate(['users-list']);
  }

}
