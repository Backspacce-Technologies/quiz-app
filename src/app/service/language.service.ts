import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
  private readonly apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) { }

  translate(text: string, targetLanguage: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {
      q: text,
      target: targetLanguage,
      format: 'text',
      key: this.apiKey,
    };

    return this.http.post(this.apiUrl, params, { headers });
  }

}