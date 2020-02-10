import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { CredentialsDTO } from "../models/credentials.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthenticationService {

  constructor(public http: HttpClient) {
  }

  authenticate(credentialsDTO: CredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credentialsDTO, {
      observe: "response",
      responseType: "text"
    });
  }
}
