import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() imgPath:string = "assets/image";
  
	  imgFileName:string = "/profile-avatar.png";

    constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authservice: AuthenticationService, private ls : LocalStorageService) {}
  	
    Onclick(){
      this.router.navigateByUrl('/home/table-list')
    }

    logOut(){
      this.ls.removeData("userInfo")
      this.router.navigateByUrl('/login')
      console.log(this.ls.removeData("userInfo"))
    }

}
