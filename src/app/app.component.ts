import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webPushFront';

  constructor(
    private swPush:SwPush
  ) { 
    Notification
    if(!this.swPush.isEnabled){
      alert('no compatible');
    }else{

      this.swPush.subscription.subscribe(
        resp => {
          console.log('--------subscription--------');
          console.log(resp);
          console.log('--------subscription--------');
          
        }
      )

      this.swPush.notificationClicks.subscribe(
        resp => {
          console.log('--------notificationClick--------');
          console.log(resp);
          console.log('--------notificationClick--------');
          // window.open(resp.notification.data.url, "_blank");
        }
      )

      this.swPush.messages.subscribe(
        resp => {
          console.log('--------messages--------');
          console.log(resp);
          console.log('--------messages--------');
          
        }
      )
    }
  }

  suscribe(){
    this.swPush.requestSubscription({
      serverPublicKey: 'BG2G2MPNLDaFe2T7kPJemfNbY6fvBJ7OvVFMWjM_u3BroOEzkLYuFQWGURWIP8NLURM5l5IGC7vSZq8oIPihbUI'
    })
    .then(o => console.log(JSON.stringify(o)))
    .catch(e => console.log(e));
  }

  unsuscribe(){
    this.swPush.unsubscribe()
      .then(o => console.log(o))
      .catch(e => console.log(e));
  }
}
