import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { User_session } from "../models/user_session";

@Injectable()
export class StorageService {

  getUserSssion() : User_session {
    const item = localStorage.getItem(STORAGE_KEYS.userSession);
    return item != null ? JSON.parse(item) : item;
  }

  setUserSession(userSession: User_session) {
    localStorage.setItem(STORAGE_KEYS.userSession, JSON.stringify(userSession));
  }

}
