// Author:- Sesha Sai
// File:-players-list.ts
// Purpose:-The logic of players-list Component
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
    players: any[];
    constructor(private appService: AppService, private toaster: ToastrService) { }

    ngOnInit(): void {
        this.appService.getPlayers().subscribe((res: any) => {
            const data = res;
            data.sort((a, b) => {
                return b.points - a.points;
            });
            this.players = data;

        }, error => {
            this.toaster.error('Something Went Wrong!', 'Error');
        });
    }

}
