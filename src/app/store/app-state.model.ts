import { CreditCardDto } from '../model-entity/credit-card.dto';

export default class CreditCardState {
  CreditCards: Array<CreditCardDto> = [];
  //CreditCardError!: Error;
}

export const initializeState = (): CreditCardState => {
  return {CreditCards: Array<CreditCardDto>()} ;//, CreditCardError: Error() };
};
