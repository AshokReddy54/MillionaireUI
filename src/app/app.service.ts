// Author:- Sesha Sai
// File:-app.service.ts
// Purpose:-integrating Backend API's
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
@Injectable({
    providedIn: 'root'
})

export class AppService {
    url = environment.apiURL;
    name: string;
    prize: number;
    constructor(private http: HttpClient, private router: Router) { }
//to get all questions
     getQuestions(): Observable<any> {
        const url = `${this.url}/questions`;
        return this.http.get(url)
            .pipe(
                map((res: Response) => {
                    return res;
                }),
                catchError((error: Response) => throwError(error))
            );
    }
    //to add a new question
    addQuestion(body) {
        const url = `${this.url}/questions/create`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(url, body).pipe(
            map((res: Response) => {
                return res;
            }),
            catchError((error: Response) => throwError(error))
        );
    }
    //to get specified answer
    getAnswer(params) {
        const url = `${this.url}/questions/${params}`;
        return this.http.get(url)
            .pipe(
                map((res: Response) => {
                    return res;
                }),
                catchError((error: Response) => throwError(error))
            );
    }
    // to create a player with points
    postPlayer(data) {
        const url = `${this.url}/players/create`;
        return this.http.post(url, data).pipe(
            map((res: Response) => {
                return res;
            }),
            catchError((error: Response) => throwError(error))
        );

    }
    // to get players
    getPlayers() {
        const url = `${this.url}/players`;
        return this.http.get(url)
            .pipe(
                map((res: Response) => {
                    return res;
                }),
                catchError((error: Response) => throwError(error))
            );
    }
}
