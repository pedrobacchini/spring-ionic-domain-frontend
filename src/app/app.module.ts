import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryService } from "../services/domain/category.service";
import { ErrorInterceptorProvider } from "../interceptor/error-interceptor";
import { AuthenticationService } from "../services/authentication.service";
import { StorageService } from "../services/storage.service";
import { ClientService } from "../services/domain/client.service";
import { AuthenticationInterceptorProvider } from "../interceptor/authentication-interceptor";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryService,
    AuthenticationInterceptorProvider,
    ErrorInterceptorProvider,
    AuthenticationService,
    StorageService,
    ClientService
  ]
})
export class AppModule {}
