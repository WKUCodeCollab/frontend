//Chat code altered from: https://tutorialedge.net/typescript/angular/angular-socket-io-tutorial/

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket;

  constructor() {
    // ---Need to define the api path in the environment files
    this.socket = io('http://45.55.196.206:3000');
   }

  connectToChat(): Rx.Subject<MessageEvent> {
    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
      this.socket.on('connect', (data) => {
          // Connected, let's sign-up for to receive messages for this room
          this.socket.emit('room', localStorage.getItem('groupID'));
      })

      this.socket.on('message', (data) => {
        console.log("Received message from Websocket Server")
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    });
    
    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
          this.socket.emit('message', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }


  connectToEditor(): Rx.Subject<MessageEvent> {
    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {      
      //If editorChange received, send changes to editor service
      this.socket.on('editorChange', (data) => {
        console.log("Received changes from Websocket Server" + JSON.stringify(data));
        observer.next(data);
      })

      //If refreshEditor received, send refreshes to editor service
      this.socket.on('refreshEditor', (data) => {
        console.log("Recieved refreshes" + data);
        observer.next(data);
      })

      //If consoleOutput received, send data back to console view
      this.socket.on('consoleOutput', (data) => {
        console.log("Received output: " + data.output);
        observer.next(data);
      })

      return () => {
        this.socket.disconnect();
      }
    });
    
    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
          if (data.hasOwnProperty("from")) {
            console.log("changes...");
            this.socket.emit('editorChange', data);
          }
          else if (data.hasOwnProperty("codeToRun")) {
            console.log("sending code to server: " + JSON.stringify(data));
            this.socket.emit('runCode', data);
          }
          else {
            console.log("refresh: " + data );
            this.socket.emit('refreshEditor', data);
          }
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}

