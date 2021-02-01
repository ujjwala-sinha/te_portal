import {Injectable} from '@angular/core';
import {IProduct} from './product';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private productUrl = 'api/products.json';
    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
            return this.http.get<IProduct[]>(this.productUrl).pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }
   // tslint:disable-next-line:typedef
   private handleError(err: HttpErrorResponse){
       let errorMessage = '';
       if (err.error instanceof ErrorEvent){
           errorMessage = `An error occured: ${err.error.message}`;
       } else{
           errorMessage = `Server returned code ${err.message}`;
       }
       console.error(errorMessage);
       return throwError(errorMessage);

    }

    }
