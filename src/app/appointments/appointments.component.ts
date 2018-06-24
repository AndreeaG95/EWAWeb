import {Component, OnInit} from '@angular/core';
import {
  CalendarEvent,
} from 'angular-calendar';
import {AngularFireDatabase} from 'angularfire2/database';
import {
  startOfDay,
  endOfDay} from 'date-fns';
import {Subject} from 'rxjs/Subject';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})

export class AppointmentsComponent implements OnInit {

  view: string = 'month';
  refresh: Subject<any> = new Subject();
  items: FirebaseListObservable<any[]>;
  viewDate: Date = new Date();
  public user: Observable<firebase.User>;

  events: CalendarEvent[] = [
    {
      title: 'Ana',
      color: colors.yellow,
      start: this.viewDate
    },
    {
      title: 'Maria',
      color: colors.blue,
      start: new Date(2018, 5, 1, 10)
    }
  ];

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    //this.afAuth.authState.subscribe
    //this.items = this.db.list('Doctors/'+auth.);
  }

  ngOnInit() {
  }


  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}
