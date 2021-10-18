import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit {

  @Input() tittle: string = "";
  
  @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') doughnutChartData: MultiDataSet = [    [350, 450, 100], ];

  public colors:Color[] =[
    {backgroundColor: ['#6857E6','#009FEE','#F02059'] } 
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
