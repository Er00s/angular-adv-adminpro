import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [

  {
    tittle: 'Dashboard',
    icon: 'mdi mdi-gauge',
    submenu:[
      {tittle: 'Main', url: '/'},
      {tittle: 'Progress Bar', url: 'progress'},
      {tittle: 'Grafica 1', url: 'charts1'},
      {tittle: 'Promesas', url: 'promesas'},
      {tittle: 'Rxjs', url: 'rxjs'},
      
    ]

  }
  ];

  constructor() { }
}
