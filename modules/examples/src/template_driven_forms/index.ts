import {bootstrap} from 'angular2/bootstrap';
import {
  NgIf,
  NgFor,
  Component,
  Directive,
  View,
  Host,
  NG_VALIDATORS,
  forwardRef,
  Binding,
  FORM_DIRECTIVES,
  NgControl,
  Validators,
  NgForm
} from 'angular2/core';

import {RegExpWrapper, print, isPresent, CONST_EXPR} from 'angular2/src/core/facade/lang';

/**
 * A domain model we are binding the form controls to.
 */
class CheckoutModel {
  firstName: string;
  middleName: string;
  lastName: string;
  country: string = "Canada";

  creditCard: string;
  amount: number;
  email: string;
  comments: string;
}

/**
 * Custom validator.
 */
function creditCardValidator(c): {[key: string]: boolean} {
  if (isPresent(c.value) && RegExpWrapper.test(/^\d{16}$/g, c.value)) {
    return null;
  } else {
    return {"invalidCreditCard": true};
  }
}

const creditCardValidatorBinding =
    CONST_EXPR(new Binding(NG_VALIDATORS, {toValue: creditCardValidator, multi: true}));

@Directive({selector: '[credit-card]', bindings: [creditCardValidatorBinding]})
class CreditCardValidator {
}

/**
 * This is a component that displays an error message.
 *
 * For instance,
 *
 * <show-error control="creditCard" [errors]="['required', 'invalidCreditCard']"></show-error>
 *
 * Will display the "is required" error if the control is empty, and "invalid credit card" if the
 * control is not empty
 * but not valid.
 *
 * In a real application, this component would receive a service that would map an error code to an
 * actual error message.
 * To make it simple, we are using a simple map here.
 */
@Component({selector: 'show-error', inputs: ['controlPath: control', 'errorTypes: errors']})
@View({
  template: `
    <span *ng-if="errorMessage !== null">{{errorMessage}}</span>
  `,
  directives: [NgIf]
})
class ShowError {
  formDir;
  controlPath: string;
  errorTypes: string[];

  constructor(@Host() formDir: NgForm) { this.formDir = formDir; }

  get errorMessage(): string {
    var control = this.formDir.form.find(this.controlPath);
    if (isPresent(control) && control.touched) {
      for (var i = 0; i < this.errorTypes.length; ++i) {
        if (control.hasError(this.errorTypes[i])) {
          return this._errorMessage(this.errorTypes[i]);
        }
      }
    }
    return null;
  }

  _errorMessage(code: string): string {
    var config = {'required': 'is required', 'invalidCreditCard': 'is invalid credit card number'};
    return config[code];
  }
}


@Component({selector: 'template-driven-forms'})
@View({
  template: `
    <h1>Checkout Form</h1>

    <form (ng-submit)="onSubmit()" #f="form">
      <p>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" ng-control="firstName" [(ng-model)]="model.firstName" required>
        <show-error control="firstName" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="middleName">Middle Name</label>
        <input type="text" id="middleName" ng-control="middleName" [(ng-model)]="model.middleName">
      </p>

      <p>
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" ng-control="lastName" [(ng-model)]="model.lastName" required>
        <show-error control="lastName" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="country">Country</label>
        <select id="country" ng-control="country" [(ng-model)]="model.country">
          <option *ng-for="#c of countries" [value]="c">{{c}}</option>
        </select>
      </p>

      <p>
        <label for="creditCard">Credit Card</label>
        <input type="text" id="creditCard" ng-control="creditCard" [(ng-model)]="model.creditCard" required credit-card>
        <show-error control="creditCard" [errors]="['required', 'invalidCreditCard']"></show-error>
      </p>

      <p>
        <label for="amount">Amount</label>
        <input type="number" id="amount" ng-control="amount" [(ng-model)]="model.amount" required>
        <show-error control="amount" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="email">Email</label>
        <input type="email" id="email" ng-control="email" [(ng-model)]="model.email" required>
        <show-error control="email" [errors]="['required']"></show-error>
      </p>

      <p>
        <label for="comments">Comments</label>
        <textarea id="comments" ng-control="comments" [(ng-model)]="model.comments">
        </textarea>
      </p>

      <button type="submit" [disabled]="!f.form.valid">Submit</button>
    </form>
  `,
  directives: [FORM_DIRECTIVES, NgFor, CreditCardValidator, ShowError]
})
class TemplateDrivenForms {
  model = new CheckoutModel();
  countries = ['US', 'Canada'];

  onSubmit(): void {
    print("Submitting:");
    print(this.model);
  }
}

export function main() {
  bootstrap(TemplateDrivenForms);
}
