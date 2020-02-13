import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storageService:StorageService) {
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
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  handle403() {
    this.storageService.removeUserSession();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
