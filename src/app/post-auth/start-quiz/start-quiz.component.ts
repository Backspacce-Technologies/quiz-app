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
  savedAnswers: (any | null)[][] = [];
  selectedOptions: { [key: string]: number[] } = {};
  r: number = 0;
  selectedAnswer: any;
  optionTouched: boolean = false;



  constructor(private ls: LocalStorageService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.formData = JSON.parse(this.ls.getItem('formDataArray')) || [];

    console.log(this.selectedOptions)
    console.log(this.formData.map(r => r.options));
    console.log(this.formData.map(a => a.correctAnswer))
    console.log(this.formData);
    console.log(this.saveAnswer)


  }

  getAllQuestions() {

    // const getQuestions = this.formData.map(a => a.question[this.currentQuestionIndex])
    // console.log(getQuestions)
    const getQuestions = this.formData.map(a => a.question[this.currentQuestionIndex])
    console.log(getQuestions)
  }

  // isOptionSelected(option: number, optionIndex: number){
  //   debugger
  //   // Check if the option is selected for the given question
  //   // const question = this.formData[questionIndex];
  //   // const selectedOptions = this.selectedOptions[question.id.toString()] || [];

  //   // return selectedOptions.includes(optionText);

  //   this.question[this.r].selectedOptions = option
  // }



  selectOption(questionIndex: number, optionIndex: number): void {

    const questionId = this.formData[questionIndex].id.toString();

    // if (!this.selectedOptions[questionIndex]) {
    //   this.selectedOptions[questionIndex] = [];
    // }

    if (!this.selectedOptions[questionId]) {
      this.selectedOptions[questionId] = [optionIndex];
    }

    const optionPosition = this.selectedOptions[questionId].indexOf(optionIndex);

    this.optionTouched = true;


    console.log(questionId)

    // if (optionPosition === -1) {
    //   this.selectedOptions[questionId].push(optionIndex);
    // } else {
    //   this.selectedOptions[questionId].splice(optionPosition, 1);
    // }

    // this.saveSelectedOptions();



    // // Save the updated selected options back to local storage
    // localStorage.setItem('selectedOptions', JSON.stringify(selectedOption));
  }
  nextq(r: number) {

    this.r++;
    return this.r;
  }

  previousQuestion(r: number) {
    this.r--;
    return this.r;
  }


  submitAnswer() {


    // const storedSelectedOptions = localStorage.getItem('selectedOptions');

    // if (storedSelectedOptions) {
    //   this.selectedOptions = JSON.parse(storedSelectedOptions);
    // }


    console.log(this.selectedOptions)
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

    return localStorage.setItem('selectedOptions', JSON.stringify(this.selectedOptions));
  }

  saveAnswer(r: string, optionIndex:any) {
    debugger
    const savedAnswers = this.selectedOptions[r] || [];
    return savedAnswers.includes(optionIndex)
  
   
   
      }


  getCurrentQuestion() {
    return this.questions.find(question => question.id === this.currentQuestionIndex);
  }
}
