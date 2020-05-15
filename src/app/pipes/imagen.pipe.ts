import { Pipe, PipeTransform, Inject } from '@angular/core';

import { URL_NOIMAGE } from '../config/config';



@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string): any {

  let noImageUrl=URL_NOIMAGE;
  if(!img){
    return noImageUrl
  }
    return img
  }

}
