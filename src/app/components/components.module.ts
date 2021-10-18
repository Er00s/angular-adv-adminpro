import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//EXTERNAL MODULES
import { ChartsModule } from 'ng2-charts';

//COMPONENTS
import { DoughnutComponent } from './doughnut/doughnut.component';
import { IncrementComponent } from './increment/increment.component';



@NgModule({
  declarations: [
    IncrementComponent,
    DoughnutComponent
  ],
  exports: [
    IncrementComponent,
    DoughnutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],

})
export class ComponentsModule { }
