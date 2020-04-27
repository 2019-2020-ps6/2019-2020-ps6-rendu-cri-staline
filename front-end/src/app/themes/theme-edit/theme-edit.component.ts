import { Component, OnInit} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ThemeService} from '../../../services/theme.service';
import {Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.scss']
})

export class ThemeEditComponent implements OnInit {
  public themeForm: FormGroup;

  public theme: Theme;

  constructor(public formBuilder: FormBuilder, public themeService: ThemeService, private router: Router,
              private route: ActivatedRoute) {
      this.themeService.themeSelected$.subscribe((theme) => {
        this.theme = theme;
        console.log(this.theme);
      });
      this.themeForm = this.formBuilder.group({
      themeName: ['']
    });

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.themeService.setSelectedTheme(id);
  }
  updateTheme() {
    const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    if (themeToAdd.themeName === '') {
      themeToAdd.themeName = this.theme.themeName;
    }
    this.themeService.updateTheme(this.theme.id, { themeName: themeToAdd.themeName
    }, this.theme.themeImage).subscribe((result) => {
      this.router.navigate(['themes-list']);
    }, error => {
      console.error('Error', error);
    });
  }
  cancel() {
    this.router.navigate(['themes-list']);
  }

  onFileChange(event) {
    this.theme.themeImage = event.target.files[0] as File;
  }
}
