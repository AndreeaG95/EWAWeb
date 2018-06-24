import { Component, OnInit, OnChanges } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PatientModel} from '../core/patient.model';
import {PatientService} from './patient.service';
import {PatientInfoModel} from '../core/patientInfo.model';
import {TemperatureModel} from '../core/temperature.model';
import {Chart} from 'chart.js';
import {$} from 'protractor';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnChanges {

  patients: Observable<PatientModel[]>;
  selectedPatient: PatientModel;

  patientInfo: Observable<PatientInfoModel[]>;

  patientTemperature: Observable<TemperatureModel[]>;
  chart: any;
  private chartData: any;

  // This will hold our chart info

  constructor(private patientsService: PatientService) { }

  ngOnInit() {
    this.patients = this.patientsService.getPatients();
  }

  ngOnChanges() {
    this.patients = this.patientsService.getPatients();
  }

  onSelect(patient: PatientModel): void {
    this.selectedPatient = patient;
    this.getPatientData();
    this.createChart();
    this.updateCharts();
  }

  getPatientData() {
    this.patientInfo = this.patientsService.getPatientInfo(this.selectedPatient.key);
  }

  getTemperatureAndDates(isDate: boolean) {
    this.patientTemperature = this.patientsService.getTemperature(this.selectedPatient.key);

    const temperatures = [];
    const dates = [];

    this.patientTemperature.subscribe(
      competitors => {
        competitors.map(competitor => {
          temperatures.push(competitor.value);
          dates.push(competitor.key);

        });
      });

    if (isDate) { return dates; }

    return temperatures;
  }

  updateCharts() {
    const chartData = this.getTemperatureAndDates(false);
    const charLabels =  this.getTemperatureAndDates(true);

    // Update our dataset
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = chartData;
    });

    this.chart.data.labels.forEach(((label) => {
      label.label = charLabels;
      }
    ));

    this.chart.update();
  }

  createChart() {
    const charLabel = this.getTemperatureAndDates(true);
    this.chartData = this.getTemperatureAndDates(false);

    console.log('Data' + this.chartData);
    console.log('Labels ' + charLabel);

    this.chart = new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: charLabel,
        datasets: [
          {
            data: this.chartData,
            borderColor: '#3cba9f',
            fill: false,
            pointRadius: 8,
            borderDash: [5, 5]
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
