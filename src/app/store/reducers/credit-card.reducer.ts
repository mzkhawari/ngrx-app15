import { Action, createReducer, on } from '@ngrx/store';
import { CreditCardDto } from '../../model-entity/credit-card.dto';
import * as CreditCardActions from '../actions/credit-card.actions';
import CreditCardState, { initializeState } from '../app-state.model';
 
const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(CreditCardActions.GetCreditCardAction, state => state),
  on(CreditCardActions.CreateCreditCardAction, (state: CreditCardState, creditCard: CreditCardDto) => {
    return { ...state, CreditCards: [...state.CreditCards, creditCard], ToDoError: null };
  }),

  on(CreditCardActions.SuccessGetCreditCardAction, (state: CreditCardState, { payload }) => {
    return { ...state, CreditCards: payload, ToDoError: null };
  }),
  on(CreditCardActions.SuccessCreateCreditCardAction, (state: CreditCardState, { payload }) => {
    return { ...state, CreditCards: [...state.CreditCards, payload], ToDoError: null };
  }),
  on(CreditCardActions.ErrorCreditCardAction, (state: CreditCardState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, ToDoError: error };
  })
);

export function CreditCardReducer(
  state: CreditCardState | undefined,
  action: Action
): CreditCardState {
  return reducer(state, action);
}