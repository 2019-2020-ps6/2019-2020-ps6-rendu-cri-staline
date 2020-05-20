import { Component, OnInit} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router , ActivatedRoute} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.scss']
})

export class ThemeEditComponent implements OnInit {
  private themeForm: FormGroup;

  private theme: Theme;

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute,
              private navigationService: NavigationService) {
      this.quizService.themeSelected$.subscribe((theme) => {
        this.theme = theme;
        console.log(this.theme);
      });
      this.themeForm = this.formBuilder.group({
      themeName: ['']
    });

  }

  ngOnInit() {
    const themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedTheme(themeId);
    this.navigationService.setPreviousUrl(['themes-list', themeId, 'quiz-list']);
  }

  /**
   * Modifie un theme
   */
  updateTheme() {
    let themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    if (themeToAdd.themeName === '') {
      themeToAdd.themeName = this.theme.themeName;
    }
    themeToAdd = {...themeToAdd, id: this.theme.id};
    this.quizService.updateTheme(this.theme.id, { themeName: themeToAdd.themeName
      }, this.theme.themeImage).subscribe((result) => {
      }, error => {
        console.error('Error', error);
      });
    // this.quizService.setQuizzesFromUrl(this.theme.id)
    // this.quizService.setSelectedTheme(this.theme.id)
    this.navigationService.previous();
  }

  cancel() {
    this.navigationService.previous();
  }

  onFileChange(event) {
    this.theme.themeImage = event.target.files[0] as File;
  }
}
