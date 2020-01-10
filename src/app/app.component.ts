import { AfterViewInit, Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, NgForm } from '@angular/forms';
import { CustomerComponent } from './customers/customer.component';
import { Observable } from 'rxjs';
// import {AfterViewInit}  from 'afterviewinit';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterViewInit {

  //@ViewChild('clearRef', {static: false}) nameClearRef: ElementRef;


  @ViewChild (CustomerComponent, {static: false} ) primaryCustomComponent: CustomerComponent;
  public form: FormGroup;
  public shouldShow =  true;
  // get statusChanges: Observable;

  // @ViewChild (NgForm, {static: false} ) Ngg: NgForm;
  //this.form = this.primaryCustomComponent.customerForm;

  title = 'Hello Team';
  validStatus: boolean; 
  //statusChanges: boolean;

  //titleInput = 'Hello Customer';

  ngOnInit() {
   // this.statusChanges();
    //this.form = this.primaryCustomComponent.customerForm;
  }

  ngAfterViewInit() {
    // child is set
    this.form = this.primaryCustomComponent.customerForm;
  }
  // ngAfterViewInit() {
  //   this.form = this.primaryCustomComponent.customerForm;

  // }

  public  toggle() { this.shouldShow = !this.shouldShow; }

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


  statusChang(): void {
    this.primaryCustomComponent.handleFormChanges();

    
  }

  // valSt(event) {
  //   console.log(event);
    
  // }

  

  // statusChanges() {
  //   this.primaryCustomComponent.valid();
  //   //return this.primaryCustomComponent.valid;  
  // }

}

