import { Component } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.sass']
})
export class DialogAddPlayerComponent {

  name = '';

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
