import { createAction, props } from '@ngrx/store';
import { CreditCardDto } from '../../model-entity/credit-card.dto';

export const GetCreditCardAction = createAction(
    '[CreditCard] - Get CreditCard'
);
export const CreateCreditCardAction = createAction(
  '[CreditCard] - Create CreditCard',
  props<CreditCardDto>()
);

export const BeginGetCreditCardAction = createAction(
    '[CreditCard] - Begin Get CreditCard'
);

export const SuccessGetCreditCardAction = createAction(
  '[CreditCard] - Sucess Get CreditCard',
  props<{ payload: CreditCardDto[] }>()
);

export const BeginCreateCreditCardAction = createAction(
    '[CreditCard] - Begin Create CreditCard',
    props<{ payload: CreditCardDto }>()
  );

export const SuccessCreateCreditCardAction = createAction(
    '[CreditCard] - Sucess Create CreditCard',
    props<{ payload: CreditCardDto }>()
  );

export const ErrorCreditCardAction = createAction(
    '[CreditCard Component] - Error', 
    props<Error>()
    );