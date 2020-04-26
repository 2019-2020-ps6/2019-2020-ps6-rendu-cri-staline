import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {Router, ActivatedRoute } from '@angular/router';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.scss']
})
export class ThemeDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, public themeService: ThemeService) {
    this.themeService.themeSelected$.subscribe((theme) => {
    this.theme = theme;
    });
  }


  public theme: Theme;


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.themeService.setSelectedTheme(id);
  }
}
