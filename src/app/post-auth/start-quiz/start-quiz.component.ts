import { Component, Input } from '@angular/core';
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
  question = [];
  currentQuestionIndex: number = 0;
  correctAnswer: any;
  userAnswers: number[] = [];
  questions: any[] = [];
  options: any[] = []
  @Input() questionForm!: FormGroup;
  resultMessage: string = '';

  constructor(private ls: LocalStorageService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.formData = JSON.parse(this.ls.getItem('formDataArray')) || [];
    console.log(this.questionForm)
    console.log(this.formData.map(r => r.options.text));
    console.log(this.formData.map(a => a.question))
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

  selectOption(index: number): void {
    const questionId = this.formData[this.currentQuestionIndex].id;
    const selectedOption = {
      questionId: questionId,
      optionIndex: index
    };const storedSelectedOptions = JSON.parse(this.ls.getItem('selectedOptions')) || {};

    // Update the selected options for the current question
    storedSelectedOptions[questionId] = selectedOption;
  
    // Save the updated selected options back to local storage
    localStorage.setItem('selectedOptions', JSON.stringify(storedSelectedOptions));
  }
  submitAnswer() {
    debugger
        const selectedAnswer = this.formData.map(options => options.selected);
   


    const correctAnswers = this.formData.map(r=>r.question);
    const totalQuestions = this.question.length;
    const correctCount = selectedAnswer.filter((answer, index) => answer === correctAnswers[index]).length;
    const resultPercentage = (correctCount / totalQuestions) * 100;
    const resultMessage = `You answered ${correctCount} out of ${totalQuestions} questions correctly (${resultPercentage}%).`;

  }
  getAllQuestions() {
    this.question
  }

  getCurrentQuestion() {
    return this.questions.find(question => question.id === this.currentQuestionIndex);
  }
}
