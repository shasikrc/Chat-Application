import { Component } from '@angular/core';
import { ChatService } from './chat.service';
// import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {

  title = 'Socket IO Client';
  user: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String, isSpecial: boolean }> = [];
  isLoggedIn: boolean = false;
  userArray: Array<String> = [];


  constructor(private _chatService: ChatService) {
    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.recivedMessages()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.userNames()
      .subscribe(data => {
        this.userArray = data;
      });
  }

  joiningRoom() {
    console.log(this.user);
    this._chatService.joinRoom({ user: this.user });
    this.isLoggedIn = true;
  }

  sendMessage() {
    this._chatService.sendMessage({ user: this.user, message: this.messageText });
    this.messageText = null;
  }


  // ngOnInit(): void {
  //    const socket = io('http://localhost:3000');
  //  }
}
