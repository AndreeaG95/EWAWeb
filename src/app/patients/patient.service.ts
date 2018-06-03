import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {PatientModel} from '../core/patient.model';
import {PatientInfoModel} from '../core/patientInfo.model';
import {TemperatureModel} from '../core/temperature.model';

@Injectable()
export class PatientService {

  private uid: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  getPatients(): Observable<PatientModel[]> {

    return this.db.list('/Doctors/' + this.uid + '/Patients')
      .snapshotChanges().map(actions => {
        return actions.map(a => ({
          key: a.payload.key, name: a.payload.val()
        }));
      });
  }

  getPatientInfo(patient: string): Observable<PatientInfoModel[]> {
    console.log('/Patients/' + patient + '/Data');
    return this.db.list('/Patients/' + patient + '/Data').valueChanges();
  }

  getTemperature(patient: string): Observable<TemperatureModel[]> {
    return this.db.list('/Patients/' + patient + '/Temperature').snapshotChanges().map(actions => {
      return actions.map(a => ({
        key: a.payload.key, value: a.payload.val()
      }));
    });
  }
}
