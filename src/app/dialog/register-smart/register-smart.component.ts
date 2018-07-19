import {Component, Inject, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FhirService} from "../../service/fhir.service";

import {RegisterSmartSecretComponent} from "../register-smart-secret/register-smart-secret.component";

declare var $: any;

@Component({
  selector: 'app-register-smart',
  templateUrl: './register-smart.component.html',
  styleUrls: ['./register-smart.component.css']
})
export class RegisterSmartComponent implements OnInit {

    registerForm : FormGroup;

  constructor(
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<RegisterSmartComponent>,
    private _formBuilder: FormBuilder,
    private fhirService: FhirService
  )
     {
  }

  @Input()
  resource = undefined;

  appName: string;

  appLaunch: string;

  appLogo: string;

  appRedirect;

  files: File | FileList;



  ngOnInit() {

      const reg = '^https?:\\/\\/\\w+(:[0-9]*)?([-a-zA-Z0-9@:%._\\+~#=]{2,256})?[\\/a-zA-Z0-9_]+$';

      console.log('Init Called TREE');

      this.registerForm = this._formBuilder.group({
          'appName' : [ new FormControl(this.appName), Validators.required ],
          'appLaunch' : [ new FormControl(this.appLaunch), [ Validators.required, Validators.pattern(reg)] ],
          'appRedirect' : [ new FormControl(this.appRedirect)  ],
          'appLogo' : [ new FormControl(this.appLogo)  ]
       //   'files': [ new FormControl(this.files), Validators.required ]
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

    registerApp() {
        console.log('register SMART App');

        let redirects: string[] = [  ];
        if (this.registerForm.controls['appRedirect'].value !== '') {
            redirects= this.registerForm.controls['appRedirect'].value.split('/n');
        };
        this.fhirService.performRegisterSMARTApp(this.registerForm.controls['appName'].value , this.registerForm.controls['appLaunch'].value , redirects , this.registerForm.controls['appLogo'].value).subscribe( response => {

                console.log(response);
                const dialogConfig = new MatDialogConfig();

                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.data = {
                    id: 1,
                    response: response
                };
                this.dialog.open( RegisterSmartSecretComponent, dialogConfig);

            }
            , (error: any) => {
                console.log("Register Response Error = "+error);
            }
            ,() => {

                console.log("Register complete()");
                this.dialogRef.close();
            }
        );

    }


 }


