import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Output() sidebarToggle = new EventEmitter<void>();
    isSidebarCollapsed: boolean = true;
  

    constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authservice: AuthenticationService, private ls : LocalStorageService) {}
  	
    Onclick(){
      this.router.navigateByUrl('/home/table-list')
    }

    

    toggleSidebar() {
      debugger
      // this.sidebarToggle.emit();
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
    closeSidebar(){
      this.isSidebarCollapsed = false;
    }

    logOut(){
      this.ls.removeData("userInfo")
      this.router.navigateByUrl('/login')
      console.log(this.ls.removeData("userInfo"))
    }

}
