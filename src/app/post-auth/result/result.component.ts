import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  quizResultMessage: string = '';
   
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    // Retrieve the route parameter 'result'
    // this.quizResultMessage = this.route.snapshot.paramMap.get('resultMessage') || '';

    const resultParam = this.route.snapshot.paramMap.get('result');
    console.log('Result Parameter:', resultParam);
    this.quizResultMessage = resultParam || '';
  }
}
