import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.scss']
})
export class CurrencyHeaderComponent implements OnInit {
  public usdRateBuy: any;
  public eurRateBuy: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchCurrentRates();
  }

  fetchCurrentRates(): void {
    this.http.get<any>('https://api.monobank.ua/bank/currency')
      .subscribe(data => {
        for(let i = 0; i < data.length; i++) {
          if(data[i].currencyCodeA == 978 && data[i].currencyCodeB == 980) {
            this.eurRateBuy = data[i].rateBuy;
          }
        } 
        for(let i = 0; i < data.length; i++) {
          if(data[i].currencyCodeA == 840 && data[i].currencyCodeB == 980) {
            this.usdRateBuy = data[i].rateBuy;
          }
        }
      });
  }
}