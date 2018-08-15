import {DataSource} from "@angular/cdk/table";
import {FhirService} from "../service/fhir.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

export class RelatedPersonDataSource extends DataSource<any> {
  

    constructor(public fhirService : FhirService, public patientId : string, public persons: fhir.RelatedPerson[]
    ) {
        super();
    }

  private dataStore: {
    persons: fhir.RelatedPerson[]
  };

  connect(): Observable<fhir.RelatedPerson[]> {

      console.log('Obs DataSource connect '+this.patientId);
      let _obs : BehaviorSubject<fhir.RelatedPerson[]> =<BehaviorSubject<fhir.RelatedPerson[]>>new BehaviorSubject([]);

      this.dataStore = { persons: [] };

      if (this.patientId != undefined) {
          this.fhirService.getRelatedPersons(this.patientId).subscribe((bundle => {
              if (bundle != undefined && bundle.entry != undefined) {
                  for (let entry of bundle.entry) {
                      this.dataStore.persons.push(<fhir.RelatedPerson> entry.resource);

                  }
              }
              _obs.next(Object.assign({}, this.dataStore).persons);
          }));
      } else if (this.persons != [] && this.persons != undefined) {
          console.log('RelatedPerson not null');
          for (let person of this.persons) {
              this.dataStore.persons.push( person);
          }
          _obs.next(Object.assign({}, this.dataStore).persons);
      }
      return _obs.asObservable();
  }

  disconnect() {}
}
