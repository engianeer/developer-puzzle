import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksComponent } from './stocks/stocks.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StocksComponent }
    ]),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedUiChartModule
  ],
  declarations: [StocksComponent]
})
export class StocksFeatureShellModule {}
