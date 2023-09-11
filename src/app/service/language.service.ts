import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly url =
    'https://translation.googleapis.com/language/translate/v2?key=YOUR_GOOGLE_API_KEY';

  constructor(private _http: HttpClient) {}

  translate(text: string, targetLanguage: string): Observable<any> {
    const requestBody = {
      q: text,
      target: targetLanguage,
    };

    return this._http.post(this.url, requestBody);
  }
}