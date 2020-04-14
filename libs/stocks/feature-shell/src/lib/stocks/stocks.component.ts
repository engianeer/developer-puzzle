import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {Subscription} from "rxjs";

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  private subscription: Subscription;

  quotes$ = this.priceQuery.priceQueries$;
  maxDate = new Date();

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    },
      {
        validator: this.validateDates()
      }
    );
  }

  validateDates() {
    return (group: FormGroup) => {

      const startDateControl = group.controls['startDate'];
      const endDateControl = group.controls['endDate'];

      if (!startDateControl.value || !endDateControl.value)
        return;

      const invalid = startDateControl.value > endDateControl.value;

      if (invalid) {
        startDateControl.setErrors({invalidDate: invalid});
        this.stockPickerForm.controls['startDate'].setValue(this.stockPickerForm.value.endDate);
      } else {
        startDateControl.setErrors(null);
      }
    }
  }

  ngOnInit() {
    this.subscription = this.stockPickerForm.valueChanges.subscribe(
      () => {
        this.fetchQuote()
      }    );
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
