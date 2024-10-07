import {Injectable, signal} from '@angular/core';

export interface INotification<T>{
  data?: T;
  type:string
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification = signal<INotification<unknown>>(undefined);

  sendNotification(notification: INotification<unknown>){
    this.notification.set(notification);

    setTimeout( () =>{
      this.notification.set(undefined);
    }, 400)
  }

  getNotification(){
    return this.notification();
  }
}
