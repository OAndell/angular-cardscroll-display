import { Component, OnInit, HostListener,  } from '@angular/core';
import { Entry } from '../../models/Entry';
import {EntryService} from '../../services/entry.service';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query
} from '@angular/animations';


@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.css'],
  animations: [
    trigger('fade', [
      transition('* => *', [
        query(':enter', [ style({opacity: 0})]),
        query(':enter', [
          stagger(200 ,[animate(300, style({ opacity: 1 }))])
        ], { optional: true }),
      ])
    ])
  ]
})

export class MainGridComponent implements OnInit {

  entryList:Entry[];
  listToShow:Entry[] = [];
  height:number = 12500;
  lastY = window.pageYOffset;
  yOffset = 0;

  constructor(private entryService:EntryService) { }

  ngOnInit(): void {
    this.entryService.getEntries(this.getEntriesCallback);
  }

  getEntriesCallback  = (results)=> {
    this.listToShow.push(...results);
    //this.listToShow.push(...this.entryList.slice(0,10));
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll($event) {
    if(window.pageYOffset >= this.height/2){
      this.height = this.height*1.5;
      this.entryService.getEntries(this.getEntriesCallback);
    }
  }

}
