import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import { EditorService } from '../socket/editor.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor;
  code: string;
  text: any;
  from: any;
  to: any;


  constructor(private editorService:EditorService) {
  }

  config = {
    mode: 'text/x-java',
    lineNumbers: true,
    theme: "abcdef"
  }

  ngOnInit() {

    this.editorService.editorSubject.subscribe(data => {
      console.log("Subscription: " + JSON.stringify(data));
      if (data.hasOwnProperty("from")) {
        this.editor.instance.replaceRange(data.text, data.from, data.to);
      }
      else {
        console.log("setvalue" + data)    
        this.editor.instance.setValue(data.body);
      }
    });

  }

  ngAfterViewInit() {

    console.log(this.editor.instance);
    this.editor.instance.setSize("100%", "100%");

    let es = this.editorService;
    let newBody = this;

    this.editor.instance.on('change', function (i, changesObj) {
      console.log(changesObj);
      es.sendChanges(changesObj);
      es.sendNewBody(newBody.code);
    });
  }

  sendToOpenJDK() {
    this.editorService.sendToOpenJDK({codeToRun: this.code });
  }

}
