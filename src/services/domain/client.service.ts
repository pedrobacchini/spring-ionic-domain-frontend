import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClientDTO } from "../../models/client.dto";

@Injectable()
export class ClientService {

  constructor(public http: HttpClient) {
  }

  getProfile(): Observable<ClientDTO> {
    return this.http.get<ClientDTO>(`${API_CONFIG.baseUrl}/client/profile`);
  }

  insert(clientDTO: ClientDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/client`, clientDTO, {
      observe: 'response',
      responseType: "text"
    });
  }
}
