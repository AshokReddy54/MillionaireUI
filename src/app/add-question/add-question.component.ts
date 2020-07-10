import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
    addQuestion: FormGroup;
    isRequired: boolean;
    constructor(private fb: FormBuilder, private appService: AppService) { }
    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.addQuestion = this.fb.group({
            question: ['', Validators.required],
            option1: ['', Validators.required],
            option2: ['', Validators.required],
            option3: ['', Validators.required],
            option4: ['', Validators.required],
            answer: [null, Validators.required]
        })
    }
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
    add() {
        this.isRequired = false;
        this.checkValidation();
        if (this.isRequired) {
            return;
        }
        const options = [];
        // tslint:disable-next-line: max-line-length
        options.push(this.addQuestion.get('option1').value,
            this.addQuestion.get('option2').value,
            this.addQuestion.get('option3').value,
            this.addQuestion.get('option4').value);
        const data = {
            name: this.addQuestion.get('question').value,
            options: options.toString(),
            answer: options[this.addQuestion.get('answer').value]
        };
        this.appService.addQuestion(data).subscribe((res: any) => {
             this.addQuestion.reset();
        }, error => {
            console.log(error);
          });

    }

}
