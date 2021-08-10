import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardDto } from '../../model-entity/credit-card.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  private ApiURL: string = 'https://localhost:44399/api/CreditCard';
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<CreditCardDto[]> {
    return this.httpclient.get<CreditCardDto[]>(this.ApiURL +"/get" );
  }

  createToDos(payload: CreditCardDto): Observable<CreditCardDto> {
    return this.httpclient.post<CreditCardDto>(this.ApiURL + "/post" , JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
