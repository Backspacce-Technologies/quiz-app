import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/service/language.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';


@Component({
	selector: 'app-table-list',
	templateUrl: './table-list.component.html',
	styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {
	questionForm!: FormGroup;
	formData = {questionForm: ''};
	selectedOptions!: string[];
	
	invalidLoginAttempt: boolean = false;

	constructor(private router: Router, private formBuilder: FormBuilder, private ls: LocalStorageService, private translate:LanguageService) {
	
	}

	ngOnInit() {

		this.questionForm = this.formBuilder.group({
			question: ['', Validators.required],
			options: this.formBuilder.array([this.createOption(false)]),
			correctAnswer: ['', Validators.required],
			multipleAnswers: [false],
			id: [Math.random()],
			selectedOptions: ['']
		})


	}
	//  SubmitData(){
	//   this.router.navigateByUrl('/home/add-form')
	//   return this.questionForm.valid
	//  }



	createOption(isMandatory: boolean): FormGroup {
		return this.formBuilder.group({
			text: ['', Validators.required],
			// isMandatory: isMandatory

		});
	}

	addOption() {
		const optionsArray = this.questionForm.get('options') as FormArray;
		optionsArray.push(this.createOption(true));
		console.log(this.questionForm)
	}

	removeOption(index: number) {
		const optionsArray = this.questionForm.get('options') as FormArray;
		optionsArray.removeAt(index);
	}

	get options(): FormArray<any> {
		return this.questionForm.get('options') as FormArray;
	}
	get questionControl(): FormArray<any>{
		return this.questionForm.get('question') as FormArray;
	}
	getQuestionForm(): FormGroup {
		return this.questionForm;
 }

	onSubmit() {
		
		
		if (this.questionForm.valid) {
			let savedData = JSON.parse(this.ls.getItem('formDataArray')) || [];
			savedData.push(this.questionForm.value);
			this.ls.saveItem('formDataArray', JSON.stringify(savedData));
			console.log('savedData', savedData);
			this.router.navigateByUrl('/home/add-form')
		}
		else {

			this.invalidLoginAttempt = true;
			console.log("Invalid form");
		}



		
	}
}