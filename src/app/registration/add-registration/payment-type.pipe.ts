import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {

  transform(value: any, list: []): any {
  	if (value != null){
  		return list.filter(obj=>obj['id_string'] == value)[0]['name']
  	}
  }

}
