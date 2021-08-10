import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CraditCardComponent } from './components/cradit-card/cradit-card.component';
import { CreditCardReducer } from './store/reducers/credit-card.reducer';
import { GreaterDateValidator } from './validator-service/validation/greater-date-validator.direction';
import { FormService } from './validator-service/FormService.Service';
import { DashboardComponent } from './components/app-dashboard/dashboard.component';
import { EffectsModule } from '@ngrx/effects';
import { CreditCardEffects } from './store/effect/credit-card.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CraditCardComponent,
    DashboardComponent,
    GreaterDateValidator,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      creditCards: CreditCardReducer   
    }),
    EffectsModule.forRoot([CreditCardEffects])
  ],
  providers:[
    FormService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
