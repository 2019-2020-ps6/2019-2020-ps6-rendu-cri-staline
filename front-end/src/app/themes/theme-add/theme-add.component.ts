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

  ngOnInit() {
  }

  addTheme() {
    const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    themeToAdd.themeImage = this.selectedFile;
    console.log(themeToAdd);
    this.themeService.addQuiz(themeToAdd);
    this.router.navigate(['themes-list']);

  //  const themeImageFile: File = ( window.document.getElementById('fileuploadbox') as HTMLInputElement).files[0];
  //  this.themeService.addThemeWithPicture(themeToAdd, themeImageFile).subscribe((event) => {
  //    console.log(event);
  //  }, error => {

  //  });
  }
onFileChange(event) {
  this.selectedFile = event.target.files[0] as File;
}

}
