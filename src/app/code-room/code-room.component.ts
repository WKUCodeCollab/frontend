import { Component, OnInit, Output } from '@angular/core';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { EditorService } from '../socket/editor.service';

@Component({
  selector: 'app-code-room',
  templateUrl: './code-room.component.html',
  styleUrls: ['./code-room.component.css']
})
export class CodeRoomComponent implements OnInit {
  output:string;

  constructor(private editorService:EditorService) { 
    this.output = "";
  }

  ngOnInit() {
    this.editorService.editorSubject.subscribe(data => {
      if (data.hasOwnProperty("output")) {
        this.output = "";
        this.output = data.output;
      }
    });
  }


}
