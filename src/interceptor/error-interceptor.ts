import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public storageService: StorageService,
    public alertController: AlertController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error) => {
        let errorObj = error.error ? error.error : error;
        errorObj = errorObj.status ? errorObj : JSON.parse(errorObj);
        console.log("Intercept detect error");
        console.log(errorObj);

        switch (error.status) {
          case 403:
            this.handle403();
            break;
          case 401:
            this.handle401();
            break;
          default:
            this.handlerDefaultError(errorObj);
            break;
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  private handle403() {
    this.storageService.removeUserSession();
  }

  private handle401() {
    this.alertController.create({
      title: 'Error 401: Authentication failure',
      message: 'Invalid email or password',
      enableBackdropDismiss: false,
      buttons: [{text: 'OK'}]
    }).present();
  }

  private handlerDefaultError(error: any) {
    this.alertController.create({
      title: `Error ${error.status}: ${error.error}`,
      message: error.message,
      enableBackdropDismiss: false,
      buttons: [{text: 'OK'}]
    }).present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
