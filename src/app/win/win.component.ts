import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Utils } from '../utill';
import { Router } from '@angular/router';
@Component({
    selector: 'app-win',
    templateUrl: './win.component.html',
    styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit {

    constructor(private appService: AppService, private router: Router) { }

    ngOnInit(): void {
        this.player();
    }
    //Shows Success Sweet alert and post the player
    player() {
        const data = {
            name: this.appService.name,
            points: 10000000
        }
        this.appService.postPlayer(data).subscribe((res: any) => {
            Utils.showAlert('Congratulations!', `${this.appService.name} you Have Won the game`, 'success', this.router);

        }, error => {
            console.log(error);
        });
    }

}
