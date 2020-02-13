import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { UserSession } from "../models/userSession";

@Injectable()
export class StorageService {

  getUserSession() : UserSession {
    const item = localStorage.getItem(STORAGE_KEYS.userSession);
    return item != null ? JSON.parse(item) : item;
  }

  setUserSession(userSession: UserSession) {
    localStorage.setItem(STORAGE_KEYS.userSession, JSON.stringify(userSession));
  }

  removeUserSession() {
    localStorage.removeItem(STORAGE_KEYS.userSession);
  }

}
