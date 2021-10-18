import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  
  //GRAFICA 1 
  public labels1: string[] = ['Nacionales', 'Internacionales', 'Mixtas' ];
  public data1 = [    [120, 444, 100]  ];


  constructor() { }

  ngOnInit(): void {
  }

}
