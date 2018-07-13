import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {FhirService} from "../../service/fhir.service";
import {EprService} from "../../service/epr.service";

@Component({
  selector: 'app-smart-apps',
  templateUrl: './smart-apps.component.html',
  styleUrls: ['./smart-apps.component.css']
})
export class SmartAppsComponent implements OnInit {

  constructor(private fhirService: FhirService, private eprService: EprService) { }

  ngOnInit() {

    this.cards = environment.apps;
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

}
