import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../auth/authenticate.service';
import { HomeService } from './home.service';
import { CreateRoomInfo } from './createRoomInfo';
import { WebsocketService } from '../socket/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newRoom = new CreateRoomInfo();
  private roomID: string;
  allRooms: any;

  constructor(
    private router: Router,
    private authService: AuthenticateService,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.homeService.getAllRooms().subscribe( res => {
      this.allRooms = res.groups;
    });

    if (localStorage.getItem('groupID') !== null) {
      localStorage.removeItem('groupID');
    }
  }

  enterNewRoom(roomName: string){
    this.authService.getUser().subscribe( res => {
        console.log(res.id);
        this.newRoom.roomName = roomName;
        this.newRoom.userId = res.id;
        localStorage.setItem('userID', res.id);
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );

    this.homeService.createRoom(this.newRoom).subscribe( res => {
      console.log("groupID:" + res.groupID);
      localStorage.setItem('groupID', res.groupID);
      this.router.navigate(['/coderoom']);
    },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

  enterOpenRoom(roomID: any){
    this.authService.getUser().subscribe( res => {
      console.log(res.id);
      localStorage.setItem('userID', res.id);
    },
    err => console.error('Observer got an error: ' + err),
    () => console.log('Observer got a complete notification')
    );

    localStorage.setItem('groupID', roomID);
    this.router.navigate(['/coderoom']);
  }

}
