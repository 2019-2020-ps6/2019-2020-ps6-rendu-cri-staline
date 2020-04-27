import { Component, OnInit} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ThemeService} from '../../../services/theme.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-theme-add',
  templateUrl: './theme-add.component.html',
  styleUrls: ['./theme-add.component.scss']
})

export class ThemeAddComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public themeService: ThemeService, private router: Router) {
    this.themeForm = this.formBuilder.group({
      themeName: [''],
      themeImage: [null, Validators.required],
    });
  }
  public themeForm: FormGroup;
  public selectedFile: File;

public errors: string[] = [];
public haveErrors = false;

  ngOnInit() {
  }

  addTheme() {
    const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    themeToAdd.themeImage = this.selectedFile;
    console.log(themeToAdd);
    this.valid(themeToAdd);
    if (!this.haveErrors) {
      /*this.themeService.addTheme(themeToAdd).subscribe((event) => {
        console.log(event);
        this.router.navigate(['themes-list']);
      }, error => {
        console.error(error);
      });*/
      this.themeService.addTheme(themeToAdd);
      this.router.navigate(['themes-list']);
    }
  }
onFileChange(event) {
  this.selectedFile = event.target.files[0] as File;
}
valid(themeToAdd) {
  this.haveErrors = false;
  this.errors = [];
  if (themeToAdd.themeName === '') {
    this.errors.push('Entrez un nom.');
    this.haveErrors = true;
  }

}
checkValue() {
  const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
  this.valid(themeToAdd);
}

}
