import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {FhirService} from "../../service/fhir.service";
import {EprService} from "../../service/epr.service";
import {RegisterSmartComponent} from "../../dialog/register-smart/register-smart.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-smart-apps',
  templateUrl: './smart-apps.component.html',
  styleUrls: ['./smart-apps.component.css']
})
export class SmartAppsComponent implements OnInit {

  constructor(private fhirService: FhirService,
              public dialog: MatDialog,
              private eprService: EprService) { }

  ngOnInit() {

    this.cards = environment.apps;


    this.fhirService.getClients().subscribe( clients => {
        console.log(clients);
    })

  }

  cards = [];

    smartApp(url: string) {

        let launch : string = undefined;

        console.log('App Lauch '+url);

        this.fhirService.launchSMART('child_measurements','4ae23017813e417d937e3ba21974581',this.eprService.patient.id).subscribe( response => {
                launch = response.launch_id;
                console.log("Returned Launch = "+launch);
            },
            (err)=> {
                console.log(err);
            },
            () => {
                window.open(url + '?iss=' + this.fhirService.getEPRUrl() + '&launch=' + launch, "_blank");
            }
        );

    }

    registerApp() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {

        };
        let resourceDialog : MatDialogRef<RegisterSmartComponent> = this.dialog.open( RegisterSmartComponent, dialogConfig);

    }

}
