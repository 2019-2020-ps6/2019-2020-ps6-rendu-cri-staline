import { Component, OnInit , Input} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {RightsService} from '../../../services/rights.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss']
})
export class ThemesListComponent implements OnInit {

  public themesList: Theme[] = [];
  public enableAdmin: boolean;

  constructor(private router: Router, public themeService: ThemeService, private rightsService: RightsService) {
    this.themeService.themes$.subscribe((theme) => this.themesList = theme);
    console.log(this.themesList);
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;

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
    this.themeService.deleteTheme(theme);
  }

}
