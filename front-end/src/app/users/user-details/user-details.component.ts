import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import {Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user.service';
import { Result } from 'src/models/result.model';
import { Label } from 'ng2-charts';
import { NavigationService } from 'src/services/navigation.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private navigationService: NavigationService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.results = this.user.results;
      this.setNbPages();
      this.changePage(this.currentPage);
      console.log(this.results);
      if (this.results.length > 1) {
        console.log('compute');
        this.compute();
      }
      this.navigationService.setTitle('Acceuilli ' + this.user.firstName + ' ' + this.user.lastName);
    });

    this.navigationService.setPreviousUrl(['users-list']);
  }


  private user: User;

  private url: any;

  private data: number[] = [];
  private results: Result[] = [];
  private labels: Label[] = [];
  private nbLabels = 7;

  private resultsDisplayed: Result[] = [];
  private nbResultsPage = 3;
  private pages: number[] = [];
  private currentPage = 1;

  private userId: string;
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.setSelectedUser(userId);
    this.navigationService.setTitle('Acceuilli ' + this.user.firstName + ' ' + this.user.lastName);
  }

  setNbPages() {
   for (let i = 0, j = 1; i < this.results.length; i++) {
     if (i % this.nbResultsPage === 0) {
       this.pages.push(j);
       j++;
     }
   }
  }

  next() {
    if (this.currentPage < this.nbResultsPage) {
      this.currentPage++;
    }
  }

  previous() {

    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  changeOrderResults() {
    this.results = this.results.sort((a, b) => {
      const aTmp: Date = new Date(a.date);
      const bTmp: Date = new Date(b.date);
      return bTmp.getTime() - aTmp.getTime();
    });
  }

  changePage(page) {
    this.changeOrderResults();
    this.resultsDisplayed = [];
    for (let i = page - 1; i < page - 1 + this.nbResultsPage && i < this.results.length; i++) {
      this.resultsDisplayed.push(this.results[i]);
    }
    console.log(this.resultsDisplayed);
  }
  compute() {

    let dates: Date[];
    dates = [];
    this.results.forEach(element => {
      dates.push(new Date(element.date));
      this.data.push(element.score * 100);
    });
    dates = dates.sort((a, b) => a.getMilliseconds() - b.getMilliseconds());
    for (let i = 0; i < this.nbLabels; i++) {
      this.labels.push(dates[i].toUTCString());
    }
  }

  goBack() {
    this.router.navigate(['users-list']);
  }


}
