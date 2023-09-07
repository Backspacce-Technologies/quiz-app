import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent {
	@Output() sideNavToggled = new EventEmitter<boolean>();
	menuStatus: boolean = false;
  	@Input() sideNavStatus: boolean = false;
    isSidebarCollapsed: boolean = true;

 
  	
    
 
 

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authservice: AuthenticationService, private ls : LocalStorageService) {}

  ngOnInit() {
    
   
    
  }

  toggleSidebar() {
    this.isSidebarCollapsed = true;
  }
 
  
  Onclick(){
    this.router.navigateByUrl('/home/table-list')
  }


  SideNavToggle(){
	this.menuStatus = !this.menuStatus;
	this.sideNavToggled.emit(this.menuStatus);
	this.sideNavStatus = !this.sideNavStatus;
  }
 
}
