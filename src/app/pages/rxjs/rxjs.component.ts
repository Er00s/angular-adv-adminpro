import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    
  

  /*   this.returnObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('subs:', valor),
      err => console.warn('error', err),
      //EL COMPLETE NO LLEVA NOMBRE
      () => console.info('obs terminado')

    ); */    
    this.intervalSubs = this.returnInteval()
                          .subscribe(  console.log )
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
    
  }

  returnInteval(): Observable<number> {
   return interval(100)
                      .pipe(       
                        //DEPENDE DONDE PONGA EL TAKE VA A TOMAR DIFERENTES VALORES POR EJEMPLO EN LA PRIMER LINEA DEL PIPE TOMA 10 VECES EL INTERVALO
                        //EN CAMBIO SI LO PONGO ABAJO TOMA 10 VECES EL TRUE EMITIDO POR EL VALOR DEL FILTER OSEA 2,4,6...20    
                        take(10),            
                        map(valor =>valor + 1 ), 
                        filter(valor => (valor % 2 === 0)? true : false )
                       
                      );

    
  }

 returnObservable(): Observable<number> {
  let i = -1;

  return new Observable<number>(observer =>{


   const intervalo =  setInterval( () => {
     
      i++;

      //NEXT ES APRA ENVIAR EL VALOR
      observer.next(i);

      if (i === 4){
        //CLEAR INTERVAL JS PURO
        clearInterval( intervalo );          
        observer.complete();
      }

      if(i === 2){        
        observer.error('i llego al valor de 2')
      }

    },1000)
  
  });

  

 }

}
