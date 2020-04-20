import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import {Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public userService: UserService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.user.imageFile = this.user.imageFile as File;
      console.log(this.user);
    });
  }


  user: User;

  public url: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }



}
