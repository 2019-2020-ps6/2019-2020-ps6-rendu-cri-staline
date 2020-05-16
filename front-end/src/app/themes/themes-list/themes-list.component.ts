import { Component, OnInit , Input} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {RightsService} from '../../../services/rights.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss']
})
export class ThemesListComponent implements OnInit {

  public themesList: Theme[] = [];
  public enableAdmin: boolean;

  constructor(private router: Router, public themeService: ThemeService, private rightsService: RightsService,
              private navigationService: NavigationService) {
    this.themeService.themes$.subscribe((theme) => this.themesList = theme);
    console.log(this.themesList);
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
    this.navigationService.setTitle('Thèmes');
  }

  ngOnInit(): void {
    if (this.enableAdmin === undefined && this.router.url !== 'themes-list') {
      this.router.navigate(['home']);
    }
  }

  themeSelected(theme: Theme) {
    console.log('themeSelect() themes-list');
  }

  deleteTheme(theme: Theme) {
    console.log('deleting theme...');
    this.themeService.deleteTheme(theme);
  }

  goBack() {
    this.router.navigate(['workspace']);
  }

  addTheme() {
    this.router.navigate(['theme-add']);
  }

  goBackInGame() {
    this.router.navigate(['users-list']);
  }
}
