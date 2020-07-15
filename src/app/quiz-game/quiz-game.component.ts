// Author:- Sesha Sai
// File:-quiz-game.ts
// Purpose:-The logic of Quiz Component
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Utils } from '../utill';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-quiz-game',
    templateUrl: './quiz-game.component.html',
    styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent implements OnInit {
    optional: boolean;
    data: any[];
    amount = [10000000, 1000000, 100000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 500, 100];
    question: string;
    options: any[];
    level: number;
    isFifty: boolean;
    destroy = new Subject();
    timer: number = 30;
    rxjsTimer = timer(1000, 1000);
    cash: number;
    message: string;
    questionSubscription: Subscription;
    id: number;
    answer: string;
    isCall: boolean;
    isPoll: boolean;

    constructor(private router: Router, private appService: AppService, private toaster: ToastrService) { }

    ngOnInit() {
        this.isFifty = false;
        this.questionSubscription = this.appService.getQuestions().subscribe((res: any) => {
            this.data = res.allquestions;
            this.start();
        }, error => {
            this.toaster.error('Something Went Wrong!', 'Error');
        });

        this.level = 0;
        this.cash = this.amount.length - 1;

    }
    //to get random 15 qsns and display question and options 
    start() {
        if (this.data.length !== 15) {
            this.data = this.data.sort(() => Math.random() - Math.random()).slice(0, 15);
        }
        this.question = this.data[this.level].name;
        this.options = this.data[this.level].options.split(',');
        this.id = this.data[this.level].id;
        this.timer = 30;
        this.timerLap();

    }

    ngOnDestroy() {
        this.destroy.unsubscribe();
        this.questionSubscription.unsubscribe();
    }
    //for timer
    timerLap() {
        this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
            this.timer = --this.timer;
            if (this.timer === 0) {
                this.destroy.next(false);
                this.destroy.complete();
                this.player();
                Utils.showAlert('Sorry!', 'You Have Lost the game', 'error', this.router);
            }
        });
    }
    //to get correct answer to question and declaring win/loose
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
                if (mode === 'fifty') {
                    const dummy = this.options.filter(d => (d !== this.answer));
                    const fiftyelement = dummy[Math.floor(Math.random() * dummy.length)];
                    this.options = [fiftyelement, this.answer].sort();
                }

            }
        }, error => {
            this.toaster.error('Something Went Wrong!', 'Error');
        });
    }
    //for 50-50
    fiftyFifty() {
        this.isFifty = true;
        this.getAnswer('', this.id, 'fifty');
    }
    //for call a friend
    callAFriend() {
        this.isCall = true;
        this.getAnswer('', this.id, 'call');
        this.destroy.next(false)
    }
    //for poll
    poll() {
        this.isPoll = true;
        this.getAnswer('', this.id, 'poll');
        this.destroy.next(false);
    }
    close() {
        this.timerLap();
    }
    //to post player information if he loose with gained points
    player() {
        var points = [...this.amount];
        points = points.sort((a, b)=>{
            return a - b;
        });;
        console.log(points)
        const data = {
            name: this.appService.name,
            points: this.level === 0 ? 0 : points[this.level - 1]
        }
        this.appService.postPlayer(data).subscribe((res: any) => {
            Utils.showAlert('Sorry!', 'You Have Lost the game', 'error', this.router);

        }, error => {
            this.toaster.error("something went wrong!", "Error")
        });
    }

}
