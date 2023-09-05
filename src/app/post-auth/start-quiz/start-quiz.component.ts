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
  question: any[] = [];
  currentQuestionIndex: number = 0;
  correctAnswer: any;
  userAnswers: number[] = [];
  questions: any[] = [];
  options: any[] = []
  @Input() questionForm!: FormGroup;
  resultMessage: string = '';
  selectedOptions: { [key: string]: number[] } = {};
  r: number = 0;
  selectedAnswer: any;


  constructor(private ls: LocalStorageService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.formData = JSON.parse(this.ls.getItem('formDataArray')) || [];

    console.log(this.selectedOptions)
    console.log(this.formData.map(r => r.options));
    console.log(this.formData.map(a => a.question))
    console.log(this.formData);
    
    // const a = this.formData.map(r => r.options[0].text)

    // this.route.paramMap.subscribe(params => {
    //   const questionIndex = Number(params.get('id'));
    //   if (!isNaN(questionIndex) && questionIndex >= 0 && questionIndex < this.question.length) {
    //     this.currentQuestionIndex = questionIndex;
    //   } else {
    //     this.router.navigate(['/start-quiz', this.currentQuestionIndex]);
    //   }
    //   console.log("abc",this.currentQuestionIndex);
    // })
  }

  getAllQuestions() {
    debugger
    // const getQuestions = this.formData.map(a => a.question[this.currentQuestionIndex])
    // console.log(getQuestions)
    const getQuestions = this.formData.map(a => a.question[this.currentQuestionIndex])
    console.log(getQuestions)
  }
  // previousQuestion() {
  // debugger
  //   if (this.currentQuestionIndex > 0) {
  //     this.currentQuestionIndex--;
  //     this.router.navigate(['/start-quiz', this.currentQuestionIndex]);
  //   }
  // }
  // nextQuestion() {
  //   if (this.currentQuestionIndex < this.questions.length - 1) {
  //     this.currentQuestionIndex++;
  //     this.router.navigate(['/start-quiz', this.currentQuestionIndex]);
  //   }
  // }
  isOptionSelected(questionIndex: number, optionIndex: number): boolean {
    // Check if the option is selected for the given question
    const selectedOptions = this.selectedOptions[questionIndex];
    return selectedOptions ? selectedOptions.includes(optionIndex) : false;
  }



  selectOption(questionIndex: number, optionIndex: number): void {

    const questionId = this.formData[questionIndex].id.toString();

    // if (!this.selectedOptions[questionIndex]) {
    //   this.selectedOptions[questionIndex] = [];
    // }
    if (!this.selectedOptions[questionId]) {
      this.selectedOptions[questionId] = [optionIndex];
    }

    const optionPosition = this.selectedOptions[questionId].indexOf(optionIndex);

    // if (optionPosition === -1) {
    //   this.sdebuggerelectedOptions[questionId].push(optionIndex);
    // } else {
    //   this.selectedOptions[questionId].splice(optionPosition, 1);
    // }

    this.saveSelectedOptions();



    // // Save the updated selected options back to local storage
    // localStorage.setItem('selectedOptions', JSON.stringify(selectedOption));
  }
  nextq(r: number) {
    const storedSelectedOptions = localStorage.getItem('selectedOptions');
    this.r++;
    return this.r;
  }

  previousQuestion(r: number) {
    this.r--;
    return this.r;
  }

  isChecked(option: any, optionIndex: number) {
    
    return this.selectedAnswer.get(this.r) === option;
  }
  submitAnswer() {
    debugger
    const storedSelectedOptions = localStorage.getItem('selectedOptions');
    if (storedSelectedOptions) {
      this.selectedOptions = JSON.parse(storedSelectedOptions);
    }


    const selectedAnswer = Object.values(this.selectedOptions);
    const correctAnswers = this.formData.map(r => r.correctAnswer);

    const totalQuestions: any = this.formData.length
    const correctCount = selectedAnswer.filter((answer, index) => answer.includes(correctAnswers[index])).length;

    const resultPercentage = (correctCount / totalQuestions) * 100;
    const resultMessage = `You answered ${correctCount} out of ${totalQuestions} questions correctly (${resultPercentage}%).`;
    console.log(resultMessage)
    this.router.navigate(['/home/result', resultMessage]);
  }

  private saveSelectedOptions(): void {
    localStorage.setItem('selectedOptions', JSON.stringify(this.selectedOptions));
  }



  getCurrentQuestion() {
    return this.questions.find(question => question.id === this.currentQuestionIndex);
  }
}
