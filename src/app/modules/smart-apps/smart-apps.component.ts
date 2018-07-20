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


    /*

    {id: 3, clientId: "hspc_appointments", clientName: "HSPC Appointments", logoUri: "https://content.hspconsortium.org/images/hspc-appointments/logo/appointments.png", scope: Array(13), …}
clientDescription
:
null
clientId
:
"hspc_appointments"
clientName
:
"HSPC Appointments"
id
:
3
logoUri
:
"https://content.hspconsortium.org/images/hspc-appointments/logo/appointments.png"
scope
:
(13) ["launch/patient", "openid", "profile", "user/*.read", "launch", "user/*.*", "patient/Patient.read", "patient/*.read", "offline_access", "patient/Patient.write", "patient/Observation.read", "patient/*.write", "patient/Observation.write"]
__proto__
:
Object
     */

    this.fhirService.getClients().subscribe( clients => {
        //console.log(clients);
        for (let client of clients) {

            if (client.scope.includes("launch")) {
                console.log(client);
                let newclient = {
                    name: client.clientName,
                    image: client.logoUri,
                    url: 'http://127.0.0.1:8000/launch.html?iss=http://localhost:9090/careconnect-gateway-secure/STU3&launch=',
                    notes: 'The widely-used Reynolds Risk Score is used to estimate the 10-year cardiovascular risk of an individual. For patients and clinicians alike, this calculation is often reported in an esoteric, hard-to-read lab report. [Uses LOINC]',
                    source : 'Boston Children Hospital'
                }
            }
        }
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
