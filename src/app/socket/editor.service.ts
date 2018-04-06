import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class EditorService {
  editorSubject: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.editorSubject = <Subject<any>>wsService
      .connectToEditor()
      .map((response: any): any => {
        return response;
      })
   }

   // send editor changes to websocket service
   sendChanges(changes){
     this.editorSubject.next(changes);
   }

   // send new body to websocket service
   sendNewBody(newBody){
     this.editorSubject.next(newBody);
   }

}
