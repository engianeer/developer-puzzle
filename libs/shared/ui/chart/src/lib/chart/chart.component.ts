import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<any>;

  private subscription: Subscription;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chart = {
      title: 'Stock price',
      type: 'LineChart',
      data: null,
      columnNames: ['period', 'close'],
      options: { width: '600', height: '400' }
    };

    this.subscription = this.data$.subscribe(newData => (this.chart.data = newData));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
