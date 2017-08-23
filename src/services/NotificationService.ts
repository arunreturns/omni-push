import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import Notify from 'notifyjs'

@Injectable()
export class NotificationService {
  constructor(public platform: Platform, public localNotifications: LocalNotifications) {
  }

  showNotification(notification) {
    console.log("[NotificationService] showNotification", notification)
    if ( this.platform.is('core') || this.platform.is('mobileweb') ){
      this.showBrowserNotification(notification)
    } else {
      this.showMobileNotification(notification)
    }
  }

  doNotification (title, body) {
    let myNotification = new Notify(title, {
      body: body,
      notifyShow: onNotifyShow,
      timeout: 5000
    })

    function onNotifyShow () {
      console.log('notification was shown!')
    }
    console.log(myNotification)
    myNotification.show()
  }

  showBrowserNotification(notification) {
    let self = this;
    if (!Notify.needsPermission) {
      self.doNotification(notification.title, notification.body)
    } else if (Notify.isSupported()) {
      Notify.requestPermission(function () {
        console.log('Permission has been granted by the user')
        self.doNotification(notification.title, notification.body)
      }, onPermissionDenied)
    }
  
    function onPermissionDenied () {
      console.warn('Permission has been denied by the user')
    }
  }

  showMobileNotification(notification) {
    this.localNotifications.schedule({
      id: 1,
      title: notification.title,
      text: notification.body
    });
  }
}