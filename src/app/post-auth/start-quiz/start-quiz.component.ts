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
  quizData ={};
  isSelected!: boolean;



  constructor(private ls: LocalStorageService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.formData = JSON.parse(this.ls.getItem('formDataArray')) || [];

    console.log(this.selectedOptions)
    console.log(this.formData.map(r => r.options));
    console.log(this.formData.map(a => a.correctAnswer))
    console.log(this.formData);
    
    // this.saveSelectedOptions();

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


    if (!this.selectedOptions[questionId]) {
      this.selectedOptions[questionId] = [optionIndex];
    }

    const optionPosition = this.selectedOptions[questionId].indexOf(optionIndex);

    if (optionPosition === -1) {
      // Option is not selected, so add it to the selected options
      this.selectedOptions[questionId].push(optionIndex);
    } else {
      // Option is already selected, so remove it
      this.selectedOptions[questionId].splice(optionPosition, 1);
    }
  
    this.optionTouched = true;
  
    console.log(this.selectedOptions);

    
  }
  nextq(r: number) {

    this.r++;
    return this.r;
  }

  previousQuestion(r: number) {
    debugger
    if(this.r > 0){
      this.r--;
      
    }
  
    const quizData:any={};
    const question = this.formData[this.r].id.toString();
    const options = this.formData[this.r].options.map((r: { text: any; })=>r.text);
    const selectedOptions = this.selectedOptions[question] || [options];
 console.log(selectedOptions)  
       
    this.selectedOptions[question] = selectedOptions;
    var a = { [question]: options}
    quizData[question] = {
      options,
    };
   
    const quizDataJSON = JSON.stringify(quizData);
    

    for (let optionIndex = 0; optionIndex < quizData[question].options.length; optionIndex++) {
      const optionText = quizData[question].options[optionIndex];
      const isSelected = selectedOptions.includes(optionText);
      console.log(`Option: ${optionText}, Is Selected: ${isSelected}`);
    
    }
      return this.r
  }


  submitAnswer() {
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

  

  saveAnswer(r: number, optionIndex:any) {
    this.ls.saveItem('selectedOptions', JSON.stringify(this.selectedOptions));
       
  }
  loadSelectedOptions(): void {
    const storedOptions = this.ls.getItem('selectedOptions');
    if (storedOptions) {
      this.selectedOptions = JSON.parse(storedOptions);
    }
  }


  getCurrentQuestion() {
    return this.questions.find(question => question.id === this.currentQuestionIndex);
  }
}
