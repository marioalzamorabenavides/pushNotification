import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private resourceService:ResourceService) { }

  readonly linkwspMessage = 'https://web.whatsapp.com/send?phone='

  arrResource:any;

  ngOnInit(): void {

    this.resourceService.loadResource()
    .subscribe(resp => {
      this.arrResource = resp;
    })
  }

}
