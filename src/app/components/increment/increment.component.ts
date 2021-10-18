import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit {

  @Input('value') progress: number = 30;
  @Input() btnClass: string = 'btn-primary';

  @Output() exitValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }


  changeValue(value: number) {

    if ((this.progress + value) > 100) {
      this.exitValue.emit(100);
      this.progress = 100;

    } else {
      if ((this.progress + value) < 0) {
        this.exitValue.emit(0);
        this.progress = 0;
      } else {
        this.progress = this.progress + value;
        this.exitValue.emit(this.progress);
      }
    }
  }

  //el onchange refleja el valor del input
  onChange(newValue:number){
    if( newValue >= 100 ){
      this.progress = 100;
    }else if (newValue <= 0){
      this.progress = 0;
    }
    else{
      this.progress= newValue;
    }

    this.exitValue.emit(this.progress);
    
  }

}
