import { Component, OnInit, Input, ViewChild,  EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, NgForm } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}
///custom validator with parameters

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild(NgForm, {static: false}) customreRefrence: NgForm;

  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;
   @Input() custom: string;
   ///@Output() validStatus: EventEmitter<boolean> = new EventEmitter();


   //@Output() CustomTogg: EventEmitter<Customer> = new EventEmitter();



 // @Input() property: string = 'default';

 // public arignanq: boolean = this.customerForm.valid;


  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]*")]],
      lastName: ['', [Validators.required,  Validators.maxLength(50), Validators.pattern("[a-zA-Z ]*")]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      phone: ['', [ Validators.pattern]],
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );

   /// this.handleFormChanges();

  }


  handleFormChanges(): void {
    // this.customerForm.valueChanges.subscribe((customer: Customer) => {
    //   console.log('username: ' + customer.firstName);
    //   console.log('lastname: ' + customer.lastName);
    // });
    this.customerForm.statusChanges.subscribe(status => {
      console.log('Form validation status: '  + status);
      //return status;
    });
    // this.firstName.statusChanges.subscribe(
    //   status => {
    //      console.log('Username validation status: '+ status);
    //   }
    // ); 
  }


  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: ['', Validators.required],
    //  street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      emailGroup: { email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com' }
    });
    const addressGroup = this.fb.group({
      addressType: 'work',
      street1: 'Mermaid Quay',
     // street2: '',
      city: 'Cardiff Bay',
      state: 'CA',
      zip: ''
    });
    this.customerForm.setControl('addresses', this.fb.array([addressGroup]));
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }


  valid()  {
    ///return this.customerForm.valid;
    // let changeValid =this.customerForm.valid;

    // console.log(changeValid);
    //  const statuss = this.customerForm.valid;

    //  return status;

     console.log(this.customerForm.valid);
  
    
  } 


  reset() {
    //console.log("clear1");

    // const firstN = this.customerForm.get('firstName');
    // console.log(firstN);
    this.customerForm.reset();

    //console.log(this.customerForm.reset());


  }

 

  // ari(arignanq) {

  //   this.validStatus.emit(arignanq);
  // }

}
