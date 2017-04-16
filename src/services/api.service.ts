import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from './environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    private produceUrl = environment.apiBaseUrl + 'produce';
    private mealTypeUrl = environment.apiBaseUrl + 'mealtype';
    private loginUrl = environment.apiBaseUrl + 'api/login';
    private submitMealUrl = environment.apiBaseUrl + 'api/meal';
    private userIsValidUrl = environment.apiBaseUrl + 'valid';

    constructor(private http: Http) { }

    public getProduceValues(): Observable<any[]> {
        return this.http.get(this.produceUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    public getMealTypeValues(): Observable<string[]> {
        return this.http.get(this.mealTypeUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    public login(creds): Observable<any> {
        return this.http.post(this.loginUrl, JSON.stringify(creds))
        .catch(this.handleLoginError);
    }

    public submitMeal(meal): Observable<any> {
        console.log('Meal: ',meal);
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(this.submitMealUrl, JSON.stringify(meal), options)
        .catch(this.handleError);
    }

    public userIsValid(): Observable<any> {
        return this.http.get(this.userIsValidUrl)
            .map(
                (result) => {
                    // console.log(result);
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private handleLoginError(error: any) {
        // let body = error.json();
        console.log(error);
        return Observable.throw(error);
    }
}