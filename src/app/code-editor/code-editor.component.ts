import {AfterViewInit, Component, ViewChild} from '@angular/core';import 'codemirror';
import 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import { CodemirrorComponent } from 'ng2-codemirror';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('editor') editor;
  code:string;
  cm:CodemirrorComponent;

  constructor() {
    this.code = "public class HelloWorld { \n\tpublic static void main(String[] args) { \n\t\tSystem.out.println(Hello, World); \n\t} \n}";
  }

  config = {
    mode: 'text/x-java',
    lineNumbers: true,
    theme: "abcdef",
    name: "editor"
  }

  ngAfterViewInit() {
    console.log(this.editor.instance);
    this.editor.instance.setSize("100%", "100%");
  

    this.editor.instance.on('change', function (i, changesObj) {
      console.log(changesObj);
    });
  }

}
