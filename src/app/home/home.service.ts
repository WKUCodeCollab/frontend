import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';
import { HttpClient, HttpHeaders } from'@angular/common/http';

import { CreateRoomInfo } from './createRoomInfo';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("id_token")
  })
};

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  //sends info needed to create a new room to the server and returns the room id
  createRoom(roomInfo: CreateRoomInfo) {
    return this.http.post<any>('http://45.55.196.206:3000/api/group', roomInfo, httpOptions)
    .map(res => res);
  }

  //retrieves all the rooms from the server
  getAllRooms() {
    return this.http.get<any>('http://45.55.196.206:3000/api/group', httpOptions)
    .map(res => res);
  }

}
