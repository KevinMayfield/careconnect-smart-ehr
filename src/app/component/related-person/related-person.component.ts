import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "../../../../node_modules/rxjs/Observable";
import {RelatedPersonDataSource} from "../../data-source/related-person-data-source";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {FhirService} from "../../service/fhir.service";
import {BundleService} from "../../service/bundle.service";
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";

@Component({
  selector: 'app-related-person',
  templateUrl: './related-person.component.html',
  styleUrls: ['./related-person.component.css']
})
export class RelatedPersonComponent implements OnInit {

    @Input() persons : fhir.RelatedPerson[];

    @Input() personsObservable : Observable<fhir.RelatedPerson[]>;

    @Input() useObservable : boolean = false;

    @Input() showResourceLink : boolean = true;

    @Input() patientId : string;

    @Output() person = new EventEmitter<any>();

    dataSource : RelatedPersonDataSource;



    displayedColumns = ['person', 'relationship','dob','gender','identifier', 'contact', 'resource'];

    constructor( private dialog : MatDialog,
                 public fhirService : FhirService,
                 public bundleService : BundleService) {
    }

  ngOnInit() {
      console.log('Patient id = '+this.patientId);
      if (this.patientId != undefined) {
          this.dataSource = new RelatedPersonDataSource(this.fhirService, this.patientId, []);
      } else {
          this.dataSource = new RelatedPersonDataSource(this.fhirService, undefined, this.persons);
      }
      console.log('calling connect');
  }

    getLastName(person : fhir.RelatedPerson) : String {
        if (person == undefined) return "";
        if (person.name == undefined || person.name.length == 0)
            return "";

        let name = "";
        if (person.name[0].family != undefined) name += person.name[0].family.toUpperCase();
        return name;

    }
    getFirstName(person : fhir.RelatedPerson) : String {
        if (person == undefined) return "";
        if (person.name == undefined || person.name.length == 0)
            return "";
        // Move to address
        let name = "";
        if (person.name[0].given != undefined && person.name[0].given.length>0) name += ", "+ person.name[0].given[0];

        if (person.name[0].prefix != undefined && person.name[0].prefix.length>0) name += " (" + person.name[0].prefix[0] +")" ;
        return name;

    }

   

    getIdentifier(identifier : fhir.Identifier) : String {
        let name : String = identifier.system
        if (identifier.system.indexOf('nhs-number') != -1) {

            name = 'NHS Number';
        } else if (identifier.system.indexOf('pas-number') != -1) {
            name='PAS Number';
        } else if (identifier.system.indexOf('PPMIdentifier') != -1) {
            name='LTH PPM Id';
        }
        return name;
    }

    
   

   
    selectRelatedPerson(person : fhir.RelatedPerson) {
        this.person.emit(person);
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

}
