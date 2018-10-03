import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()

export class ChatService {
    private socket = io('http://localhost:3000');

    joinRoom(data) {
        this.socket.emit('join', data);
    }

    newUserJoined() {
        let observable = new Observable<{ user: String, message: String, isSpecial: boolean }>(observer => {
            this.socket.on('new User Joined', (data) => {
                observer.next(data);
            });
            // if error happened, below part execueted and 
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    userLeftRoom() {
        let observable = new Observable<{ user: String, message: String, isSpecial: boolean }>(observer => {
            this.socket.on('User Leaved', (data) => {
                observer.next(data);
            });
            // if error happened, below part execueted and 
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    sendMessage(data) {
        this.socket.emit('message', data);
    }

    recivedMessages() {
        let observable = new Observable<{ user: String, message: String, isSpecial: boolean }>(observer => {
            this.socket.on('newMessage', (data) => {
                observer.next(data);
            });
            // if error happened, below part execueted and 
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    // Get user name list
    userNames() {
        let observable = new Observable<Array<String>>(observer => {
            this.socket.on('usernames', (data) => {
                observer.next(data);
            });
            // if error happened, below part execueted and 
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

}