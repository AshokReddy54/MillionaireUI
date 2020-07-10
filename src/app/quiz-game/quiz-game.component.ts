import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Observable, Subscription, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
    selector: 'app-quiz-game',
    templateUrl: './quiz-game.component.html',
    styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent implements OnInit {
    optional: boolean;
    data: any[]
        ;
    amount = [10000000, 1000000, 100000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 500, 100];
    question: string;
    options: any[];
    level: number;
    isFifty: boolean;
    @ViewChild('dummy') el: ElementRef;
    destroy = new Subject();
    timer: number;
    rxjsTimer = timer(1000, 1000);
    cash: number;
    message: string;
    questionSubscription: Subscription;
    id: number;
    answer: string;
    isCall: boolean;
    isPoll: boolean;

    constructor(private router: Router, private currencyPipe: CurrencyPipe, private appService: AppService) { }

    ngOnInit() {
        this.isFifty = false;
        this.questionSubscription = this.appService.getQuestions().subscribe((res: any) => {
            this.data = res.allquestions;
            this.start();
        }, error => {
            console.log(error);
        });

        this.level = 0;
        this.cash = this.amount.length - 1;

    }
    start() {
        if (this.data.length !== 4) {
            this.data = this.data.sort(() => Math.random() - Math.random()).slice(0, 15);
        }
        this.question = this.data[this.level].name;
        this.options = this.data[this.level].options.split(',');
        this.id = this.data[this.level].id;
        this.timerLap();

    }


    ngOnDestroy() {
        this.destroy.unsubscribe();
        this.questionSubscription.unsubscribe();
    }
    timerLap() {
        this.timer = 30;
        this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
            this.timer = --this.timer;
            if (this.timer === 0) {
                this.destroy.next(false);
                this.destroy.complete();
                this.appService.showAlert('Sorry!', 'You Have Lost the game', 'error');
            }
        });
    }
    getAnswer(option, id, mode) {
        this.appService.getAnswer(id).subscribe((res: any) => {
            this.answer = res.answer;
            if (mode === 'selected') {
                this.destroy.next(false);
                if (option === this.answer) {
                    if (this.level === this.data.length - 1) {
                        this.router.navigate(['/win']);
                        return;
                    }
                    ++this.level;
                    --this.cash;
                    this.start();
                } else {
                    this.player();

                }
            } else {
                this.message = `Your Friend Answer is ${this.answer}`;
                if (mode === 'fifty') {
                    const dummy = this.options.filter(d => (d !== this.answer));
                    const fiftyelement = dummy[Math.floor(Math.random() * dummy.length)];
                    this.options = [fiftyelement, this.answer].sort();
                }

            }
        }, error => {
            console.log(error);
        });
    }
    fiftyFifty() {
        this.isFifty = true;
        this.getAnswer('', this.id, 'fifty');
    }
    callAFriend() {
        this.isCall = true;
        this.getAnswer('', this.id, 'call');
    }
    poll() {
        this.isPoll = true;
        this.getAnswer('', this.id, 'poll');
    }
    player() {
        const points = this.amount.sort();
        const data = {
            name: this.appService.name,
            points: points[this.level]
        }
        this.appService.postPlayer(data).subscribe((res: any) => {
            this.appService.showAlert('Sorry!', 'You Have Lost the game', 'error');

        }, error => {
            console.log(error);
        });
    }

}
