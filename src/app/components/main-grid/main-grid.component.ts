import { Component, OnInit, HostListener} from '@angular/core';
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
          stagger(100 ,[animate(1000, style({ opacity: 1 }))])
        ], { optional: true }),
      ])
    ])
  ]
})

export class MainGridComponent implements OnInit {
  
  listToShow:Entry[] = [];
  height:number = 7000;
  lastY = window.pageYOffset;
  yOffset = 0;
  lastEntryID:string = "";
  loadMoreFlag:boolean = true;

  constructor(private entryService:EntryService) { }

  ngOnInit(): void {
    this.entryService.getEntries(this.getEntriesCallback);
    this.entryService.registerOnReloadCallback(this.refreshListCallback);
  }

  getEntriesCallback = (results)=> {
    this.listToShow.push(...results);
    this.lastEntryID = this.listToShow[this.listToShow.length-1].id;
    this.loadMoreFlag = true;
  }

  refreshListCallback = () => {
    this.listToShow = [];
    window.scroll(0,0);
    this.entryService.getEntries(this.getEntriesCallback);
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll($event) {
    const lastEntryElement = document.getElementById(this.lastEntryID);
    if(this.loadMoreFlag && Math.abs(lastEntryElement.getBoundingClientRect().y) <= 100){
      this.loadMoreFlag = false;
      this.height = this.height*1.5;
      this.entryService.getEntries(this.getEntriesCallback);
    }
  }

}
