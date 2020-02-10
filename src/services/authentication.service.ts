import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { CredentialsDTO } from "../models/credentials.dto";
import { API_CONFIG } from "../config/api.config";
import { User_session } from "../models/user_session";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthenticationService {

  constructor(
    public http: HttpClient,
    public storageService:StorageService) {
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

  private successfulAuthentication(authorizationHeader: string) {
    const token : string = authorizationHeader.substring(7);
    const userSession : User_session = {
      token: token
    };
    this.storageService.setUserSession(userSession);
  }

  logout() {
    this.storageService.setUserSession(null);
  }
}
