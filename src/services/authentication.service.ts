import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredentialsDTO } from "../models/credentials.dto";
import { API_CONFIG } from "../config/api.config";
import { UserSession } from "../models/userSession";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthenticationService {

  jwthelper: JwtHelper = new JwtHelper();

  constructor(
    public http: HttpClient,
    public storageService: StorageService) {
  }

  authenticate(credentialsDTO: CredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credentialsDTO, {
      observe: "response",
      responseType: "text"
    }).map((response) => {
      let authorization = response.headers.get('Authorization');
      this.successfulAuthentication(authorization)
    });
  }

  refreshToken() {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh-token`, {}, {
      observe: "response",
      responseType: "text"
    }).map((response) => {
      let authorization = response.headers.get('Authorization');
      this.successfulAuthentication(authorization)
    });
  }

  private successfulAuthentication(authorizationHeader: string) {
    const token: string = authorizationHeader.substring(7);
    const userSession: UserSession = {
      token: token,
      email: this.jwthelper.decodeToken(token).sub
    };
    this.storageService.setUserSession(userSession);
  }

  logout() {
    this.storageService.removeUserSession();
  }
}
