import { Component, OnInit} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ThemeService} from '../../../services/theme.service';
import {Router , ActivatedRoute} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.scss']
})

export class ThemeEditComponent implements OnInit {
  public themeForm: FormGroup;

  public theme: Theme;

  constructor(public formBuilder: FormBuilder, public themeService: ThemeService, private router: Router,
              private route: ActivatedRoute, private navigationService: NavigationService) {
      this.themeService.themeSelected$.subscribe((theme) => {
        this.theme = theme;
        console.log(this.theme);
      });
      this.themeForm = this.formBuilder.group({
      themeName: ['']
    });

  }

  ngOnInit() {
    const themeId = this.route.snapshot.paramMap.get('themeId');
    this.themeService.setSelectedTheme(themeId);
    this.navigationService.setPreviousUrl(['themes-list', themeId, 'quiz-list']);
  }
  updateTheme() {
    let themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    if (themeToAdd.themeName === '') {
      themeToAdd.themeName = this.theme.themeName;
    }
    themeToAdd = {...themeToAdd, id: this.theme.id};
    console.log(themeToAdd);
    if (themeToAdd.themeImage !== undefined) {
      this.themeService.updateThemeImageFile(this.theme.id, { themeName: themeToAdd.themeName
      }, this.theme.themeImage).subscribe((result) => {
      }, error => {
        console.error('Error', error);
      });
    } else {
      this.themeService.updateTheme(this.theme.id, themeToAdd);
    }
    this.navigationService.previous();
  }

  cancel() {
    this.navigationService.previous();
  }

  onFileChange(event) {
    this.theme.themeImage = event.target.files[0] as File;
  }
}
