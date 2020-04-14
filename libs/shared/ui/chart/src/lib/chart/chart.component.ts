import {
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
  @Input() startDate: Date;
  @Input() endDate: Date;

  private subscription: Subscription;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };

  ngOnInit() {
    this.chart = {
      title: 'Stock price',
      type: 'LineChart',
      data: null,
      columnNames: ['period', 'close'],
      options: { width: '600', height: '400' }
    };

    this.subscription = this.data$.subscribe(newData => (
      this.chart.data = this.filterData(newData)
    ));

  }

  filterData(data): void {

    const sd = this.startDate.getTime();
    const ed = this.endDate.getTime();

    const res = data.filter(d => {
      const time = new Date(d[0]).getTime();
      return (sd <= time && time <= ed);
    });
    return res;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
