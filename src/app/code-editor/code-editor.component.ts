import {Component, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import { EditorService } from '../socket/editor.service';
import { CodeInfo } from './codeInfo';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') editor;
  code: string;
  text: any;
  from: any;
  to: any;
  codeObj = new CodeInfo();


  constructor(private editorService:EditorService) {
  }

  //configuration for codemirror editor
  config = {
    mode: 'text/x-java',
    lineNumbers: true,
    theme: "abcdef"
  }

  ngOnInit() {
    //recieves data from the editor service when changes or updates occur
    this.editorService.editorSubject.subscribe(data => {
      console.log("Subscription: " + JSON.stringify(data));
      if (data.hasOwnProperty("from")) {
        this.editor.instance.replaceRange(data.text, data.from, data.to);
      }
      else if (data.hasOwnProperty("body")) {
        console.log("setvalue" + JSON.stringify(data));    
        this.editor.instance.setValue(data.body);
      }
    });

  }

  ngAfterViewInit() {

    console.log(this.editor.instance);
    this.editor.instance.setSize("100%", "100%");

    let es = this.editorService;
    let newBody = this;

    //send changes to the editor service
    this.editor.instance.on('change', function (i, changesObj) {
      console.log(changesObj);
      es.sendChanges(changesObj);
      es.sendNewBody(newBody.code);
    });
  }

  //send code body to the editor service to run the code
  sendToOpenJDK() {
    //checks if the user included inputs for the java program
    if (!this.codeObj.codeInput){
      this.editorService.sendToOpenJDK({ codeToRun: this.code });
    }
    else {
      this.codeObj.codeToRun = this.code;
      console.log(this.codeObj.codeInput);
      this.editorService.sendToOpenJDK(this.codeObj);
    }
  }

  ngOnDestroy() {
    this.editorService.editorSubject.unsubscribe();
  }

}
