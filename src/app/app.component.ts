import {  Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, NgForm } from '@angular/forms';
import { CustomerComponent } from './customers/customer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('clearRef', {static: false}) nameClearRef: ElementRef;


  @ViewChild (CustomerComponent, {static: false} ) primaryCustomComponent: CustomerComponent;
  public form: FormGroup;

  // @ViewChild (NgForm, {static: false} ) Ngg: NgForm;
  //this.form = this.primaryCustomComponent.customerForm;

  title = 'Hello Team';

  //titleInput = 'Hello Customer';

  public enableDisablec(): void {
     this.primaryCustomComponent.valid();

    // console.log(this.primaryCustomComponent);
    // console.log( this.primaryCustomComponent.valid() );
  }
  public enableDisable(): boolean {

    let indic = true;
    return indic = !indic;

   // console.log(this.primaryCustomComponent);
     ///console.log( this.primaryCustomComponent.valid() );
 }


//  Toggle() {
//     console.log("tog");
//  }

  public clearFunc(): void {
    //console.log('clear');
    this.primaryCustomComponent.reset();

    console.log(this.primaryCustomComponent);
  }


  public PopulateFunc(): void {
    this.primaryCustomComponent.populateTestData();
  }


  statusChanges() {
    this.primaryCustomComponent.valid();
    //return this.primaryCustomComponent.valid;  
  }
}

