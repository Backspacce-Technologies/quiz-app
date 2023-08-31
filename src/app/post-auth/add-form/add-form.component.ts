import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';



@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {
    formData: any[] = [];
    options: any[] = [];
 

    constructor(private router: Router, private ls: LocalStorageService, private authservice: AuthenticationService,private fb: FormBuilder) { 
      
    }

    ngOnInit() {
        
        this.formData = JSON.parse(this.ls.getItem('formDataArray')) || [];
        
        console.log(this.formData)
       
        
    }

    QuizForm() {
        this.router.navigateByUrl('/home/table-list')
    }
    
    DeleteList(index:number) {
     this.ls.removeData(JSON.stringify(this.formData))
     this.formData.splice(index, 1);
        
     }

    


     updateData(index:number, newData:any){
        debugger
        this.router.navigateByUrl('/home/table-list')
        this.formData.at(index).patchValue(newData)
     }
}