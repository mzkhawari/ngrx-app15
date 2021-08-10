import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  // get all values of the formGroup, loop over them
  // then mark each field as touched
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      let control = formGroup.get(field);             //{3}
      if(control!=null){
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({onlySelf:true});        
      }
      if (control instanceof FormGroup) {             //{4}      
        this.markFormGroupTouched(control);            //{6}
      }
    });
  }

  // return list of error messages
  public validationMessages() {
    const messages = {
      min:(value:any)=>{
        debugger;
        return `Min Value ${value.min}`;
      },
      max:(value:any)=>{
        return `Max Value ${value.max}`;
      },
      email:(value:any)=>{
        return `Email is Required`;
      },
      required:(value:any)=>{
        return `The Field is Required`;
      },
      validateEqual:(value:any)=>{
        return `The Filed "${value.fromControl}" Should be Equal by "${value.toControl}".`;
      },
      validateGreater:(value:any)=>{
        return `The Filed "${value.fromControl}" Should be Greater from "${value.toControl}".`;
      },
      validateGreaterEqual:(value:any)=>{
        return `The Field "${value.fromControl}" Should be Grater Or Equal from "${value.toControl}".`;
      },
      validateGreaterDate:(value:any)=>{
        debugger;
        return `The Field "${value.fromControl}" Should be Grater from "${value.toControl}".`;
      },      
      validateSmaller:(value:any)=>{
        return `The Filed "${value.fromControl}" Should be Smaller from "${value.toControl}".`;
      },
      validateSmallerEqual:(value:any)=>{
        return `The Field "${value.fromControl}" Should be Smaller Or Equal by "${value.toControl}".`;
      },
      minlength:(value:any)=>{
        return `Minimum Character ${value.requiredLength}`;
      },
      maxlength:(value:any)=>{
        return `Maximum Character ${value.requiredLength}`;
      },
      validateMinValue:(value:any)=>{
        return `Minimum Number ${value.minimumValue}`;
      },
      validateMaxValue:(value:any)=>{
        return `Maximum Number ${value.maximumValue}`;
      },      
      validateSelected:(value:any)=>{
        return ` Please Select One. `;
      },
      invalid_characters: (matches: any[]) => {
        let matchedCharacters = matches;
        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;
          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }
          return string;
        }, '');

        return `That Character Not Used: ${matchedCharacters}`;
      },
    };
    return messages;
  }

  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;
    debugger;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && (key=='minlength' || key=='maxlength') ) {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }else if(key=='validateEqual'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }else if(key=='validateGreater'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }else if(key=='validateGreaterEqual'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }else if(key=='validateGreaterDate'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateSmaller'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateSmallerEqual'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateMaxValue'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateMinValue'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }      
              else if(key=='validateSelected'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }              
              else if(key === 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
              else if(key =='required'){
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
              else if(key =='min'){
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
              else if(key =='max'){
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
              else if(key =='email'){
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }              
              // else{
              //   formErrors[field] = formErrors[field] || messages[key];
              // }
            }
          }
        }
      }
    }
    return formErrors;
  }
}