import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  ngOnInit(){

  }

  constructor(private router: Router){}
  @Input() currentQuestionIndex = 0

  navigateToStartQuiz() {
    // Replace with the actual question ID or index
    this.router.navigate(['home','start-quiz']);
  }

}
