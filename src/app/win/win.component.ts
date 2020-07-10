import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
@Component({
    selector: 'app-win',
    templateUrl: './win.component.html',
    styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit {

    constructor(private appService: AppService) { }

    ngOnInit(): void {
        this.player();
    }
    player() {
        const data = {
            name: this.appService.name,
            points: 10000000
        }
        this.appService.postPlayer(data).subscribe((res: any) => {
            this.appService.showAlert('Congratulations!', `${this.appService.name} you Have Won the game`, 'success');

        }, error => {
            console.log(error);
        });
    }

}
