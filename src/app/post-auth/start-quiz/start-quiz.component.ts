import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent {
  formData: any[] = [];
  public question: any = [];
  currentQuestionIndex: number = 0;
  userAnswers: number[] = [];
  questions: any[] = [];
  options: any[] = []
  questionForm!: FormGroup;

  constructor(private ls: LocalStorageService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.formData = JSON.parse(this.ls.getItem('formDataArray')) || [];

    console.log(this.formData.map(r => r.options.text));
    console.log(this.formData);
    this.getAllQuestions();

    const a = this.formData.map(r => r.options[0].text)

    this.route.paramMap.subscribe(params => {
      const questionIndex = Number(params.get('id'));
      if (!isNaN(questionIndex) && questionIndex >= 0 && questionIndex < this.question.length) {
        this.currentQuestionIndex = questionIndex;
      } else {
        this.router.navigate(['/start-quiz', this.currentQuestionIndex]);
      }
    })


  }
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.router.navigate(['/start-quiz', this.currentQuestionIndex]);
    }
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.router.navigate(['/start-quiz', this.currentQuestionIndex]);
    }
  }
  submitAnswer() {
    const selectedAnswer = this.questionForm.value.options.map((options: { selected: any; }) => options.selected);
  }
  getAllQuestions() {
    this.question
  }

  getCurrentQuestion() {
    return this.questions.find(question => question.id === this.currentQuestionIndex);
  }
}
