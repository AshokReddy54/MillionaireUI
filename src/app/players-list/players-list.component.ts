import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
    players: any[];
    constructor(private appService: AppService) { }

    ngOnInit(): void {
        this.appService.getPlayers().subscribe((res: any) => {
            this.players = res;
        });
    }

}
