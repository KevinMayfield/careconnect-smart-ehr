import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LinksService} from "../../service/links.service";
import {BundleService} from "../../service/bundle.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {FhirService} from "../../service/fhir.service";
import {CarePlanDataSource} from "../../data-source/care-plan-data-source";
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";
import {EncounterDialogComponent} from "../../dialog/encounter-dialog/encounter-dialog.component";

@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.component.html',
  styleUrls: ['./care-plan.component.css']
})
export class CarePlanComponent implements OnInit {

    @Input() carePlans : fhir.CarePlan[];

    @Output() condition = new EventEmitter<any>();

    @Input() patientId : string;

    @Input() useBundle :boolean = false;

    dataSource : CarePlanDataSource;


    displayedColumns = ['category','categorylink', 'status','intent','contextLink', 'resource'];


    constructor(private linksService : LinksService,
              public bundleService : BundleService,
              public dialog: MatDialog,
              public fhirService : FhirService) { }

  ngOnInit() {
      if (this.patientId != undefined) {
          this.dataSource = new CarePlanDataSource(this.fhirService, this.patientId, []);
      } else {
          this.dataSource = new CarePlanDataSource(this.fhirService, undefined, this.carePlans);
      }
  }

    getCodeSystem(system : string) : string {
        return this.linksService.getCodeSystem(system);
    }

    isSNOMED(system: string) : boolean {
        return this.linksService.isSNOMED(system);
    }

    getSNOMEDLink(code : fhir.Coding) {
        if (this.linksService.isSNOMED(code.system)) {
            window.open(this.linksService.getSNOMEDLink(code), "_blank");
        }
    }

    select(resource) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            id: 1,
            resource: resource
        };
        let resourceDialog : MatDialogRef<ResourceDialogComponent> = this.dialog.open( ResourceDialogComponent, dialogConfig);
    }

    showEncounter(carePlan : fhir.CarePlan) {

        let contexts = [];

        this.bundleService.getResource(carePlan.context.reference).subscribe((encounter) => {
                if (encounter != undefined && encounter.resourceType === "Encounter") {
                    contexts.push(<fhir.Encounter> encounter);

                    const dialogConfig = new MatDialogConfig();

                    dialogConfig.disableClose = true;
                    dialogConfig.autoFocus = true;
                    // dialogConfig.width="800px";
                    dialogConfig.data = {
                        id: 1,
                        encounters : contexts,
                        useBundle : this.useBundle
                    };
                    let resourceDialog: MatDialogRef<EncounterDialogComponent> = this.dialog.open(EncounterDialogComponent, dialogConfig);
                }
            }
        );

    }

}
