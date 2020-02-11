import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClientDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {

  constructor(
    public http: HttpClient,
    public storageService: StorageService) {

  }

  getProfile(): Observable<ClientDTO> {
    const token = this.storageService.getUserSession().token;
    const authHeader = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.get<ClientDTO>(`${API_CONFIG.baseUrl}/cliente/profile`, {
      headers: authHeader
    });
  }
}
