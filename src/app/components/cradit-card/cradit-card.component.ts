import { Component, forwardRef, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CreditCardDto } from '../../model-entity/credit-card.dto';
import CreditCardState from '../../store/app-state.model';
import * as CreditCardActions from '../../store/actions/credit-card.actions';
import { map } from 'rxjs/operators';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormService } from '../../validator-service/FormService.Service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-cradit-card',
  templateUrl: './cradit-card.component.html',
  styleUrls: ['./cradit-card.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CraditCardComponent),
      multi: true
    }
  ]
})
export class CraditCardComponent implements OnInit {

  creditCards: Observable<CreditCardState>;
  creditCardList: CreditCardDto[] =[];
  constructor(private store: Store<{creditCards: CreditCardState }>, private formService: FormService) {
    this.creditCards = store.pipe(select('creditCards'));
  }



  

  model: CreditCardDto = new CreditCardDto();
  CurrentDate :Date= new Date();
  ngOnInit(): void {

    this.model = new CreditCardDto();
    let ToDoSubscription = this.creditCards
      .pipe(
        map(x => {
          this.creditCardList = x.CreditCards;
        })
      )
      .subscribe();
      this.store.dispatch(CreditCardActions.BeginGetCreditCardAction());
  }

  formErrors = {
    CreditCardNumber:'',
    CardHolder:'',
    SecurityCodeCCV: '',
    Amount:'',
    ExpirationDate:'',
  };

  private reRunValidator(form:NgForm){
    form.controls['CreditCardNumber'].updateValueAndValidity({onlySelf:false, emitEvent:true})
    form.controls['CardHolder'].updateValueAndValidity({onlySelf:false, emitEvent:true})
    form.controls['SecurityCodeCCV'].updateValueAndValidity({onlySelf:false, emitEvent:true})
    form.controls['Amount'].updateValueAndValidity({onlySelf:false, emitEvent:true})
    form.controls['ExpirationDate'].updateValueAndValidity({onlySelf:false, emitEvent:true})
  }

  OnSubmit(form:NgForm){
    if(!form.valid && form.submitted)
      this.reRunValidator(form);

      if(form.valid){      
        this.store.dispatch( CreditCardActions.BeginCreateCreditCardAction({payload: this.model}));
        this.model= new CreditCardDto();
        this.formErrors.Amount ="";
        this.formErrors.CardHolder ="";
        this.formErrors.CreditCardNumber ="";
        this.formErrors.ExpirationDate ="";
        this.formErrors.SecurityCodeCCV ="";
      } else{
        console.log(form.errors);
        this.formErrors = this.formService.validateForm(form.form , this.formErrors, false);
        this.formService.markFormGroupTouched(form.form);
      }
  }
}