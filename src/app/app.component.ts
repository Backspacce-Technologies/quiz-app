import { Component } from '@angular/core';
import { LanguageService } from './service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quiz-App';

  constructor(private languageService: LanguageService){
   
  }
}
