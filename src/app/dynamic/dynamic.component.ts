import { Component, OnInit, Input, ViewChild,  EventEmitter, Output, AfterViewInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, NgForm } from '@angular/forms';


import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// import { Customer } from './customer';

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
/// custom validator with parameters

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit, AfterViewInit {

  ///@ViewChild(NgForm, {static: false}) customreRefrence: NgForm;

  dynamicForm: FormGroup;
  // customer = new Customer();
  emailMessage: string;
   @Input() custom: string;
   @Output() validStatus: EventEmitter<boolean> = new EventEmitter();

   items: FormArray;
   public arignanq = 'outputtext';
   private listOfSubcriptions: Subscription[] = [];


   private listOfChechbox: Subscription[] = [];
   public checkboxes: Array<boolean>;
   // tslint:disable-next-line: ban-types
   public checkbox: Boolean;


  // get addresses(): FormArray {
  //   return this.dynamicForm.get('addresses') as FormArray;
  // }

  // private validationMessages = {
  //   required: 'Please enter your email address.',
  //   email: 'Please enter a valid email address.'
  // };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      firstName: ['Lilit', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],

      items: this.fb.array([ this.createItem() ]),
    });

    // this.dynamicForm.get('notification').valueChanges.subscribe(
    //   value => this.setNotification(value)
    // );

    const emailControl = this.dynamicForm.get('emailGroup.email');


    // emailControl.valueChanges.pipe(
    //   debounceTime(1000)
    // ).subscribe(
    //   value => this.setMessage(emailControl)
    // );

   /// this.handleFormChanges();


    this.dynamicForm.statusChanges.subscribe(status => {
    console.log('ari from child: '  + status);
    // return status;
    if (status === 'VALID') {
      this.validStatus.emit(true);
    } else {
      this.validStatus.emit(false);
    }

  });

  }

  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      dissenting: [false],
      description: '',

    });
  }

  // addItem(): void {
  //   this.items = this.dynamicForm.get('items') as FormArray;
  //   this.items.push(this.createItem());
  // }

  public ngAfterViewInit(): void {
    this.listenerForItems(0);

   /// this.detectCheckbox(0);
  }

  // private detectCheckbox(i: number): void {
  //   this.items = this.dynamicForm.get('items') as FormArray;
  //     // const controls: number = Object.keys(this.items.controls).length;
  //     // console.log(controls);
  //     // for (let i = 0; i <= controls; i++) {
  //     //   /////console.log(this.items.controls[i].value.dissenting);
  //     //     //this.checkboxes[i] = this.items.controls[i].value.dissenting;
  //     //     ///console.log(this.checkboxes[i]);
  //     // }

  // }

  private listenerForItems(i: number): void {
    const items = this.dynamicForm.get('items') as FormArray;
    // var item = items.at(name);
    // console.log(item);

    ////const itemss = this.dynamicForm.controls.items.controls[i].controls.name.value;



    this.listOfSubcriptions.push(items.controls[i].statusChanges.subscribe((val: string) => {

      //console.log(items.controls[0].value);
      // console.log(items.controls[i].value.name);
      ////console.log(items.controls[i].value.dissenting);


      // const controls: number = Object.keys(this.items.controls).length;
      // console.log(controls);
      // for (let j = 0; j <= controls; j++) {

      //    ///  console.log(this.items.controls[i].value.dissenting);

      //      if (this.items.controls[i].value.dissenting === true) {
      //       this.checkbox  = this.items.controls[i].value.dissenting;
      //       console.log(this.checkbox);
      //      }
      //     //this.checkboxes[i] = this.items.controls[i].value.dissenting;
      //     ///console.log(this.checkboxes[i]);
      // }


        // const controls: number = Object.keys(this.items.controls).length;
        // // console.log(controls);
        // for (let j = 0; j <= controls; j++) {

        //   // console.log(items.controls[i].value.dissenting);
        // }

      //this.checkboxes[i] = items.controls[i].value.dissenting;



     if ((val === 'VALID') &&  (items.controls[i].value.name )  &&
      ( items.controls[i].value.name.length === 10)
      // (items.controls[0].value.name.value.length > 0))
      // ((Array.isArray(items.controls[0].value.name.value) && items.controls[0].value.name.value.length > 0))
      )
      {
        console.log(items.controls[i].value.name);
        this.addItem(i + 1);
     }

    //  else

    //  if ( items.controls[i].value.name.lenght < 20) {
    //    this.removeItem(i + 1);
    //   }

     }


     ));
  }


  private addItem(i: number): void {
    this.items = this.dynamicForm.get('items') as FormArray;
    this.items.push(this.createItem());

    this.listenerForItems(i);
   /// this.detectCheckbox(i);
    //console.log(this.listOfSubcriptions);

  }

  // private removeItem(currentItem): void {
  //   this.items = this.dynamicForm.get('items') as FormArray;
  //   const controls: number = Object.keys(this.items.controls).length;
  //   for (let i = 0; i <= controls; i++) {
  //     if (i > currentItem) {
  //       this.items.removeAt(currentItem);
  //       this.listOfSubcriptions[currentItem].unsubscribe();
  //       this.listOfSubcriptions.pop();
  //     }
  //   }
  // }

  save() {
    /////console.log(this.dynamicForm);
    console.log('Saved: ' + JSON.stringify(this.dynamicForm.value));
  }


  valid()  {

     console.log(this.dynamicForm.valid);

  }


  reset() {

    this.dynamicForm.reset();



  }




}
