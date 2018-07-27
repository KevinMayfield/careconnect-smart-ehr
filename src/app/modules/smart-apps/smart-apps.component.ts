import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {FhirService} from "../../service/fhir.service";
import {EprService} from "../../service/epr.service";
import {RegisterSmartComponent} from "../../dialog/register-smart/register-smart.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-smart-apps',
  templateUrl: './smart-apps.component.html',
  styleUrls: ['./smart-apps.component.css']
})
export class SmartAppsComponent implements OnInit {

  constructor(private fhirService: FhirService,
              public dialog: MatDialog,
              private eprService: EprService,
              private authService: AuthService) { }

  ngOnInit() {

    this.cards = environment.apps;

    this.fhirService.getClients().subscribe( response => {
        //console.log(clients);
        const clients: any[] = response as any[];
        for (let client of clients) {

            if (client.scope.includes("launch")) {
                let found = false;
                for (let search of this.cards) {
                    if (search.clientId === client.clientId) {
                        found=true;
                    }
                }
                if (!found) {
                    console.log(client);
                    let newclient = {
                        id: client.id,
                        name: client.clientName,
                        image: client.logoUri,
                        url: '',
                        notes: client.clientDescription,
                        source: '',
                        clientId: client.clientId
                    }
                    this.cards.push(newclient);
                }
            }

        }
    })

  }

  cards = [];

    smartApp(card) {

        let launch : string = undefined;

        console.log('App Lauch '+card.url);

        if (card.url !== '') {

            this.fhirService.launchSMART(card.clientId, '4ae23017813e417d937e3ba21974581', this.eprService.patient.id).subscribe(response => {
                    launch = response.launch_id;
                    console.log("Returned Launch = " + launch);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    window.open(card.url + '?iss=' + this.fhirService.getEPRUrl() + '&launch=' + launch, "_blank");
                }
            );
        } else {
            this.fhirService.getEndpoints(card.clientId).subscribe( result => {
                console.log(result);
                let bundle: fhir.Bundle = result;
                if (bundle.entry !== undefined) {
                    for (const entry of bundle.entry) {
                        let resource: fhir.Resource = entry.resource;
                        if (resource.resourceType === 'Endpoint') {
                            let endpoint: fhir.Endpoint = <fhir.Endpoint> resource;
                            this.fhirService.launchSMART(card.clientId, '4ae23017813e417d937e3ba21974581', this.eprService.patient.id).subscribe(response => {
                                    launch = response.launch_id;
                                    console.log("Returned Launch = " + launch);
                                },
                                (err) => {
                                    console.log(err);
                                },
                                () => {
                                    window.open(endpoint.address + '?iss=' + this.fhirService.getEPRUrl() + '&launch=' + launch, "_blank");
                                }
                            );
                        }
                    }
                }
            })
        }

    }

    registerApp() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {

        };
        let resourceDialog : MatDialogRef<RegisterSmartComponent> = this.dialog.open( RegisterSmartComponent, dialogConfig);

    }

    configuration() {
        this.authService.setCookie();
        let url:string = localStorage.getItem("registerUri");
        url = url.replace('register','');
        window.open(url, "_blank");
    }

}
