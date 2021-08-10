import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateGreaterDate][formControlName],[validateGreaterDate][formControl],[validateGreaterDate][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GreaterDateValidator), multi: true }
    ]
})
export class GreaterDateValidator implements Validator {
    constructor( 
        @Attribute('validateGreaterDate') public validateGreaterDate: any) {}
        validate(currentInput: AbstractControl): any {
            debugger;
            let currentInputValue:Date = new Date(currentInput.value);
            // control value (e.g. password)
            //splitValidations[1] 0:FromControl , 1: toControl
            let splitValidations = this.validateGreaterDate.split(',');
            let againstInput = currentInput.root.get(splitValidations[1]);   
            if(againstInput!=null){
                let againstInputValue:Date = new Date( againstInput.value);
                // value not equal
                if (againstInputValue && currentInputValue && !(currentInputValue.getTime() > againstInputValue.getTime())) 
               {                
                   return {            
                       validateGreaterDate: false,
                       fromControl: splitValidations[0],
                       toControl: splitValidations[1]                   
                    }
                }
            }else{
                let againstInputValue = new Date();
                // value not equal
                if (againstInputValue && currentInputValue && !(currentInputValue.getTime() > againstInputValue.getTime()))
               {                
                   return {            
                       validateGreaterDate: false,
                       fromControl: splitValidations[0],
                       toControl: splitValidations[1]                   
                    }
                }
            } 
    }
}