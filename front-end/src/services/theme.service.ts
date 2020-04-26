import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Theme } from '../models/theme.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: Theme[];

  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);

  public themeSelected$: Subject<Theme> = new Subject();

  private themeUrl = serverUrl + '/themes';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setThemesFromUrl();
  }
/*
  addThemeWithPicture(theme: Theme, imageFile: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('themeFile', imageFile);

    const options = {
      params: new HttpParams(),
      reportProgress: true,
    };
    const url = this.themeUrl + '/createTheme';
    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
   // this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }
*/
  setThemesFromUrl() {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  addQuiz(theme: Theme) {
    this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

  setSelectedTheme(themeId: string) {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });

  }

  deleteTheme(theme: Theme) {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

  updateTheme(index: string, theme: Theme) {
    const urlWithId = this.themeUrl + '/' + index;
    this.http.put<Theme>(urlWithId, theme, this.httpOptions).subscribe(() => {this.setThemesFromUrl(); });

  }

}

