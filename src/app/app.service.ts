import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    url = 'http://localhost:3000';
    name:string;
    prize:number;
    constructor(private http: HttpClient, private router: Router) { }

    public showAlert(title, text, icon) {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'Ok'
        }).then((result) => {
            this.router.navigate(['/']);
        });

    }
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
    getAnswer(params){
        const url = `${this.url}/questions/${params}`;
        return this.http.get(url)
            .pipe(
                map((res: Response) => {
                    return res;
                }),
                catchError((error: Response) => throwError(error))
            );
    }
    postPlayer(data){
        const url = `${this.url}/players/create`;
        return this.http.post(url, data).pipe(
            map((res: Response) => {
                return res;
            }),
            catchError((error: Response) => throwError(error))
        );

    }
    getPlayers(){
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
