import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
 isSidebarCollapsed: boolean = true;

  constructor(private router: Router, private sidebarService: SidebarService){}
  ngOnInit(){
    this.sidebarService.isSidebarCollapsed$.subscribe((isOpen) => {
      this.isSidebarCollapsed = isOpen;
    });
  }

  
  @Input() currentQuestionIndex = 0
  
 


  navigateToStartQuiz() {
    // Replace with the actual question ID or index
    this.router.navigate(['home','start-quiz']);
  }

}
