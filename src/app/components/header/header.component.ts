import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { EntryService } from "../../services/entry.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('subreddit') input:ElementRef; 

  text: string;
  
  constructor(private entryService:EntryService) { }


  ngOnInit(): void {
    this.text = this.entryService.subreddit;
  }

  onClick() {
    this.entryService.changeSub(this.input.nativeElement.value);
  }

}
