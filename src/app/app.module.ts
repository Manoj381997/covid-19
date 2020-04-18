import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovidApiServiceService } from './covid-api-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule }    from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ChartsModule,
    HighchartsChartModule
  ],
  providers: [CovidApiServiceService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
