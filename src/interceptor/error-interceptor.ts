import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessageDTO } from "../models/field-message-d-t.o";

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
          case 422:
            this.handle422(errorObj);
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

  private handle422(errorObj: any) {
    this.alertController.create({
      title: 'Validation error',
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [{text: 'OK'}]
    }).present();
  }

  private handlerDefaultError(errorObj: any) {
    this.alertController.create({
      title: `Error ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [{text: 'OK'}]
    }).present();
  }

  private listErrors(error: FieldMessageDTO[]) {
    let string = '';
    error.forEach(fieldMessage => string += `<strong>${fieldMessage.fieldName}</strong> ${fieldMessage.message}`);
    return string;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
