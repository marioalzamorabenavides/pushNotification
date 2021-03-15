import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker'
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private swPush: SwPush,
    private router: Router,
    private resourceService:ResourceService
  ) { }

  notifyAlert = null;

  ngOnInit(): void {

    if (this.swPush.isEnabled) {

      this.swPush.subscription.subscribe(
        resp => {
          this.notifyAlert = resp;
        }
      )

      this.swPush.notificationClicks.subscribe(
        resp => {

          let urlGo:string = resp.notification.data.url;
          this.router.navigate([urlGo.substring(2)]);
        }
      )

      this.swPush.messages.subscribe(
        resp => {
          console.log('--------messages--------');
          console.log(resp);
          console.log('--------messages--------');
        }
      )
    } else {
      this.notifyAlert = true;
    }
  }

  suscribe() {
    this.swPush.requestSubscription({
      serverPublicKey: 'BG2G2MPNLDaFe2T7kPJemfNbY6fvBJ7OvVFMWjM_u3BroOEzkLYuFQWGURWIP8NLURM5l5IGC7vSZq8oIPihbUI'
    })
      .then(o => {
        this.resourceService.registerPush(o).subscribe(
          resp => {
            console.log(resp);
          }
        )
        // console.log(JSON.stringify(o))
      })
      .catch(e => console.log(e));
  }

  unsuscribe() {

    this.swPush.unsubscribe()
      .then(o => {

        this.resourceService.registerPush(this.notifyAlert).subscribe(
          resp => {
            console.log(resp);
          }
        )

        this.notifyAlert = null;
      })
      .catch(e => console.log(e));
  }
}
