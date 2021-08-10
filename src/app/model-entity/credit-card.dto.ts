export class CreditCardDto   {

    constructor(
        public CreditCardNumber?:string,
        public CardHolder?:string,
        public ExpirationDate?:Date,
        public SecurityCodeCCV?:number,
        public Amount?:number,
    ){        
    }
}
