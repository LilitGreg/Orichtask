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

  validInvalid = true;



  ngOnInit() {

  }

  ngAfterViewInit() {
    // child is set
    this.form = this.primaryCustomComponent.customerForm;
  }


  public  toggle() {
    this.shouldShow = !this.shouldShow;
    this.shouldShow ? this.primaryCustomComponent.customerForm.disable() : this.primaryCustomComponent.customerForm.enable();
  }

  public enableDisablec(): void {
     this.primaryCustomComponent.valid();

  }



  public clearFunc(): void {
    //console.log('clear');
    this.primaryCustomComponent.reset();

    console.log(this.primaryCustomComponent);
  }


  public PopulateFunc(): void {
    this.primaryCustomComponent.populateTestData();
  }


  // statusChang(): void {
  //   this.primaryCustomComponent.handleFormChanges();

  // }

  valSt(event) {
    console.log("ari from parent: " + event);
    this.validInvalid = event;
    // console.log(event);
  }


  public submit(): void {
    this.primaryCustomComponent.save();

    ///console.log(this.primaryCustomComponent);
  }



}

