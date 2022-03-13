import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   baseUrl:string= environment.baseUrl;
  constructor(private http:HttpClient) { 

  }
  getSortedCards(postData:string):Observable<string[]>{
    return this.http.post<any>(this.baseUrl+'Cards/SortedCards',postData);
  }
}
