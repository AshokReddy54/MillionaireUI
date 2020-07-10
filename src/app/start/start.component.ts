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

    angForm: FormGroup;
    isRequired: boolean;
    constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {
        this.createForm();
    }
    createForm() {
        this.angForm = this.fb.group({
            name: ['', Validators.required],

        });
    }

    ngOnInit(): void {
    }
    onKey = ($event) => {
        this.isRequired = false;
    }

    start() {
        if (this.angForm.controls['name'].value) {
            this.appService.name = this.angForm.controls['name'].value;
            this.router.navigate(['quiz']);
        }
        else {
            this.isRequired = true;
            return;
        }

    }

}
