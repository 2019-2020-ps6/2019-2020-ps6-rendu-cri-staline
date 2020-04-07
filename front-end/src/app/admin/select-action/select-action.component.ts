import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent implements OnInit {


  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  selectAddingUser() {
    this.router.navigate(['user-add']);
  }
<<<<<<< HEAD

=======
>>>>>>> 197feb8bc54a734603872cad96cb4a3f931a9518
}
