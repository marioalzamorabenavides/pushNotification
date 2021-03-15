import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private resourceService: ResourceService, private router: Router) { }

  formRegister: FormGroup;
  imgUrl = '';

  ngOnInit(): void {

    this.formRegister = new FormGroup({
      imgUrl: new FormControl(''),
      categoria: new FormControl(''),
      cantidad: new FormControl(''),
      descripcion: new FormControl(''),
      numero: new FormControl(''),
      distrito: new FormControl('')
    });

    this.formRegister.get('categoria').valueChanges.subscribe(
      resp => {
        if (resp == 'Cama UCI') {
          this.imgUrl = 'https://cloudfront-us-east-1.images.arcpublishing.com/semana/KTLYNTY5INH2DL4OMJREV2SXRM.jpg';
        }
        if (resp == 'Galon de Oxígeno') {
          this.imgUrl = 'https://www.infradehonduras.com.hn/wp-content/uploads/2020/02/CILINDRO-DE-OXIGENO-DE-30-PC-3AL-ME.jpg'
        }
        if (resp == 'Respirador') {
          this.imgUrl = 'https://tec.mx/sites/default/files/inline-images/respirador-mecanico.jpg'
        }
        this.formRegister.get('imgUrl').setValue(this.imgUrl);
      }
    )
  }

  saveResource() {
    this.resourceService.saveResource(this.formRegister.value)
      .subscribe(
        resp => {
          this.router.navigate(['/resources']);
        },
        error => {
          console.log(error);
        }
      )
  }
}
