import {Component, Inject, Input, OnInit} from '@angular/core';
import integer = fhir.integer;
import {EprService} from "../../service/epr.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-register-smart',
  templateUrl: './register-smart.component.html',
  styleUrls: ['./register-smart.component.css']
})
export class RegisterSmartComponent implements OnInit {

    registerForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterSmartComponent>,
    private _formBuilder: FormBuilder)
     {
  }

  @Input()
  resource = undefined;

  appName: string;

  appLaunch: string;

  appRedirect: string;

  files: File | FileList;



  ngOnInit() {

      const reg = '^https?:\\/\\/\\w+(:[0-9]*)?([-a-zA-Z0-9@:%._\\+~#=]{2,256})?[\\/a-zA-Z0-9_]+$';

      console.log('Init Called TREE');

      this.registerForm = this._formBuilder.group({
          'appName' : [ new FormControl(this.appName), Validators.required ],
          'appLaunch' : [ new FormControl(this.appLaunch), [ Validators.required, Validators.pattern(reg)] ],
          'appRedirect' : [ new FormControl(this.appRedirect), [ Validators.required, Validators.pattern(reg)] ],
          'files' : [ new FormControl(this.files), Validators.required ]
      });

  }

    fileSelectMsg: string = 'No file selected yet.';
    fileUploadMsg: string = 'No file uploaded yet.';
    disabled: boolean = false;

    selectEvent(file: File): void {
        this.fileSelectMsg = file.name;
    }

    uploadEvent(file: File): void {
        this.fileUploadMsg = file.name;
    }

    cancelEvent(): void {
        this.fileSelectMsg = 'No file selected yet.';
        this.fileUploadMsg = 'No file uploaded yet.';
    }


 }


