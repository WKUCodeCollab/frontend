import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AceEditorModule } from 'ng2-ace-editor';
import { CodemirrorModule } from 'ng2-codemirror';
import { codemirror } from 'codemirror';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { AuthenticateService } from './auth/authenticate.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { CodeRoomComponent } from './code-room/code-room.component';
import { ChatService } from './socket/chat.service';
import { WebsocketService } from './socket/websocket.service';
import { ChatComponent } from './chat/chat.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { EditorService } from './socket/editor.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CodeRoomComponent,
    ChatComponent,
    CodeEditorComponent   
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AceEditorModule,
    CodemirrorModule
  ],
  providers: [AuthenticateService, AuthGuard, WebsocketService, ChatService, EditorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
