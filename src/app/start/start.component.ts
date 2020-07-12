// Author:- Sesha Sai
// File:- start.ts
// Purpose:-The logic of start Component
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

    playerForm: FormGroup;
    isRequired: boolean;
    constructor(private fb: FormBuilder, private router: Router, private appService: AppService) { }

    //creating player form control
    createForm() {
        this.playerForm = this.fb.group({
            name: ['', Validators.required],

        });
    }

    ngOnInit(): void {
        this.createForm();
    }

    //checking name feild and redirects to Quiz
    start() {
        if (this.playerForm.controls['name'].value) {
            this.appService.name = this.playerForm.controls['name'].value;
            this.router.navigate(['quiz']);
        }
        else {
            this.isRequired = true;
            return;
        }

    }

}
