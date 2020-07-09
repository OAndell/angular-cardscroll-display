import { Component, OnInit, Input} from '@angular/core';
import  {Entry} from '../../models/Entry';
import {MatDialog} from '@angular/material/dialog';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component'


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() entry:Entry
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onClick(){
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: this.entry
    });
    
    
    /*dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });*/
   //window.open(this.entry.link);
  }

}
