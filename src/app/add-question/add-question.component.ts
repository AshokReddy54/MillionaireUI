// Author:- Sesha Sai
// File:-add-question.ts
// Purpose:-The logic of add-question Component
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
    addQuestion: FormGroup;
    isRequired: boolean;
    isLoading: boolean;
    constructor(private fb: FormBuilder, private appService: AppService, private toaster: ToastrService) { }
    ngOnInit(): void {
        this.createForm();
    }
//to create Add question Form
    createForm() {
        this.addQuestion = this.fb.group({
            question: ['', Validators.required],
            option1: ['', Validators.required],
            option2: ['', Validators.required],
            option3: ['', Validators.required],
            option4: ['', Validators.required],
            answer: [null, Validators.required]
        });
    }
    //to check Form validation
    checkValidation() {
        if (this.addQuestion.get('question').hasError('required')) {
            this.isRequired = true;
        }
        if (this.addQuestion.get('option1').hasError('required')) {
            this.isRequired = true;
        }
        if (this.addQuestion.get('option2').hasError('required')) {
            this.isRequired = true;
        }
        if (this.addQuestion.get('option3').hasError('required')) {
            this.isRequired = true;
        }
        if (this.addQuestion.get('option4').hasError('required')) {
            this.isRequired = true;
        }
        if (this.addQuestion.get('answer').hasError('required')) {
            this.isRequired = true;
        }
    }
    //to add a new question
    add() {
        this.isRequired = false;
        this.checkValidation();
        if (this.isRequired) {
            return;
        }
        this.isLoading = true;
        const options = [];
        // tslint:disable-next-line: max-line-length
        options.push(this.addQuestion.get('option1').value,
            this.addQuestion.get('option2').value,
            this.addQuestion.get('option3').value,
            this.addQuestion.get('option4').value);
        const data = {
            name: this.addQuestion.get('question').value,
            options: options.toString(),
            answer: options[this.addQuestion.get('answer').value - 1]
        };
        this.appService.addQuestion(data).subscribe((res: any) => {
            this.addQuestion.reset();
            this.isLoading = false;
            this.toaster.success('Added Question Successfully!', 'Success');
        }, error => {
            this.toaster.error('Something Went Wrong!' , 'Error');
        });

    }

}
