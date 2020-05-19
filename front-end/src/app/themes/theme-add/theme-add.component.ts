import { Component, OnInit} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-theme-add',
  templateUrl: './theme-add.component.html',
  styleUrls: ['./theme-add.component.scss']
})

export class ThemeAddComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,
              public quizService: QuizService,
              private router: Router,
              private navigationService: NavigationService) {
    this.themeForm = this.formBuilder.group({
      themeName: [''],
      themeImage: [null, Validators.required],
    });
    this.navigationService.setPreviousUrl(['themes-list']);
  }
  private themeForm: FormGroup;
  private selectedFile: File;

  private errors: string[] = [];
  private haveErrors = false;

  ngOnInit() {
  }

  addTheme() {
    console.log('add thm is callED');
    const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    themeToAdd.themeImage = this.selectedFile;
    console.log(themeToAdd);
    this.valid(themeToAdd);
    if (!this.haveErrors) {
     this.quizService.addTheme(themeToAdd, themeToAdd.themeImage).subscribe((event) => {
        console.log(event);
        this.navigationService.previous();
      }, error => {
        console.error(error);
      });
     // this.quizService.addTheme(themeToAdd);
     // this.navigationService.previous();
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

cancel() {
  this.navigationService.previous();
}
checkValue() {
  const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
  this.valid(themeToAdd);
}

}
