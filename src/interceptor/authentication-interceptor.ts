import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(public storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userSession = this.storageService.getUserSession();
    const interceptBaseUrlLength = API_CONFIG.baseUrl.length;
    const requestToBaseUrl = req.url.substring(0, interceptBaseUrlLength) === API_CONFIG.baseUrl;
    if (userSession && requestToBaseUrl) {
      const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + userSession.token)});
      return next.handle(authReq);
    } else
      return next.handle(req);
  }
}

export const AuthenticationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true
};
