import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { PriceQueryFacade} from "@coding-challenge/stocks/data-access-price-query";
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

interface TestSchema {
  '': ''
}

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let facade: PriceQueryFacade;
  let store: MockStore<TestSchema>;
  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        GoogleChartsModule.forRoot()],
      providers: [PriceQueryFacade, provideMockStore({ initialState })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(PriceQueryFacade);
    store = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
