import {
	HttpTrainer,
	HttpErrorResponse,
	HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	baseUri = "http:

	headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(private http: HttpTrainer) {}

	createPokemon(data: any): Observable<any> {
		const url = `${this.baseUri}/addRA`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	createTournament(data: any): Observable<any> {
		const url = `${this.baseUri}/addR`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	createTrainer(data: any): Observable<any> {
		const url = `${this.baseUri}/addC`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	getPokemons() {
		return this.http.get(`${this.baseUri}/getallRA`);
	}

	getTournaments() {
		return this.http.get(`${this.baseUri}/getallR`);
	}

	getTrainers() {
		return this.http.get(`${this.baseUri}/getallC`);
	}

	
	getPokemon(id: any): Observable<any> {
		const url = `${this.baseUri}/getRA/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	
	getTournament(id: any): Observable<any> {
		const url = `${this.baseUri}/getR/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	
	getTrainer(id: any): Observable<any> {
		const url = `${this.baseUri}/getC/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	
	updatePokemon(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateRA/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	
	updateTournament(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateR/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	
	updateTrainer(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateC/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	
	deletePokemon(id: any): Observable<any> {
		const url = `${this.baseUri}/deleteRA/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	
	deleteTournament(id: any): Observable<any> {
		const url = `${this.baseUri}/deleteR/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	deleteTrainer(id: any): Observable<any> {
		const url = `${this.baseUri}/deleteC/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	errorMgmt(error: HttpErrorResponse) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.message;
		} else {
			
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log("ApiService errorMessage: ", errorMessage);
		return throwError(errorMessage);
	}
}
