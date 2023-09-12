import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LanguageService } from 'src/app/service/language.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { SidebarService } from 'src/app/service/sidebar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @Input() imgPath:string = "assets/image";
  
	  imgFileName:string = "/profile-avatar.png";
 
    isSidebarCollapsed: boolean = true;
   
    textToTranslate: string = 'Hello, world!';
    translatedText: string = '';
    siteLanguage = 'English';
    languageList = [
      { code: 'en', label: 'English' },
      { code: 'de', label: 'Deutsch' },
    ];
    selectedLanguage!: string;
  
  
  

    constructor(private formBuilder: FormBuilder, private router: Router, private sidebarService: SidebarService, private route: ActivatedRoute, private authservice: AuthenticationService, private ls : LocalStorageService,private languageService: LanguageService, private translate: TranslateService) {  }
  	

    changeSiteLanguage(localeCode: string): void{
      const selectedLanguage = this.languageList
      .find((language)=>language.code === localeCode)
      ?.label.toString();
      this.selectedLanguage = localeCode;

      if(selectedLanguage){
        this.siteLanguage = selectedLanguage;
        this.translate.use(localeCode)
      }
      const currentLanguage = this.translate.currentLang;
      console.log('currentLanguage', currentLanguage)
    }


    // translateAndSend() {
    //   const textToTranslate = 'Hello, world!'; // Replace with your text
    //   const targetLanguage = 'es'; // Replace with your target language code
  
    //   this.languageService.translateAndSend(textToTranslate, targetLanguage).subscribe((response) => {
    //     // Handle the API response here
    //     console.log(response);
    //   });
    // }


    Onclick(){
      this.router.navigateByUrl('/home/table-list')
    }

  
    closeSidebar(){
      this.sidebarService.toggleSidebar();
    }

    logOut(){
      this.ls.removeData("userInfo")
      this.router.navigateByUrl('/login')
      console.log(this.ls.removeData("userInfo"))
    }

}
