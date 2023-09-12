import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly apiKey = 'AIzaSyD-ylBRfYB78hl-s4oBC_3-Jf1za2-9YZA';
  private readonly apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient, private translate: TranslateService) {}

  translateAndSend(text: string, targetLanguage: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Use ngx-translate to translate the text
    const translatedText = this.translate.instant(text);

    const params = {
      q: translatedText,
      target: targetLanguage,
      format: 'text',
      key: this.apiKey,
    };

    return this.http.post(this.apiUrl, params, { headers });
  }

}