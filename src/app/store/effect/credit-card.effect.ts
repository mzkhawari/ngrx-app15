import { Injectable } from '@angular/core';
//import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CreditCardActions from '../actions/credit-card.actions';
import { ApiHttpService } from '../../services/http-api/api.httpservice';
import { CreditCardDto } from '../../model-entity/credit-card.dto';
import { Actions, ofType, createEffect } from '@ngrx/effects';

@Injectable()
export class CreditCardEffects {
  constructor(private todoService: ApiHttpService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(CreditCardActions.BeginGetCreditCardAction),
      mergeMap(action =>
        this.todoService.getToDos().pipe(
          map((data: CreditCardDto[]) => {            
            return CreditCardActions.SuccessGetCreditCardAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(CreditCardActions.ErrorCreditCardAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(CreditCardActions.BeginCreateCreditCardAction),
      mergeMap(action =>
        this.todoService.createToDos(action.payload).pipe(
          map((data: CreditCardDto) => {
            return CreditCardActions.SuccessCreateCreditCardAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(CreditCardActions.ErrorCreditCardAction(error));
          })
        )
      )
    )
  );

}