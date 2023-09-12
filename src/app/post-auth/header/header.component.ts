import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LanguageService } from 'src/app/service/language.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { SidebarService } from 'src/app/service/sidebar.service';

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
  
  

    constructor(private formBuilder: FormBuilder, private router: Router, private sidebarService: SidebarService, private route: ActivatedRoute, private authservice: AuthenticationService, private ls : LocalStorageService,private languageService: LanguageService) {
    
    }
  	



  translateText(): void {
    this.languageService
      .translate(this.textToTranslate, 'es') // Translate to Spanish
      .subscribe((response) => {
        if (response.data && response.data.translations) {
          this.translatedText = response.data.translations[0].translatedText;
        } else {
          this.translatedText = 'Translation not available.';
        }
      });
    
    }


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
