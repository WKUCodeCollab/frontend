import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../socket/chat.service';
import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  //stores message objects recieved from server
  messages: Message[] = [];
  message;

  constructor(private chat:ChatService) { }

  //subscribes to the chat service and recieves message objects from the server
  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.messages.push({firstName: msg.name, text: msg.text.slice(1, -1)});
      console.log(msg);
    })
  }

  //sends message objects to the chat service
  sendMessage() {
    this.chat.sendMsg(this.message);
    this.message = '';
  }

  ngOnDestroy() {
    this.chat.messages.unsubscribe();
  }
  

}
