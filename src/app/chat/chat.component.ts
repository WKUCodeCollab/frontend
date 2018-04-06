import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../socket/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = [];
  message;

  constructor(private chat:ChatService) { }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg.text.slice(1, -1));
      console.log(msg);
    })
  }

  sendMessage() {
    this.chat.sendMsg(this.message);
    this.message = '';
  }

  

}
