import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import  {Entry} from '../../models/Entry';




@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public entry: Entry) { }
  
  ngOnInit(): void {
    console.log(this.entry.image)
  }
  
  gotoLink(){
    window.open(this.entry.link);
  }

}
