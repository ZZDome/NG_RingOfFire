import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-game',
  templateUrl: './dialog-add-game.component.html',
  styleUrls: ['./dialog-add-game.component.sass']
})
export class DialogAddGameComponent {

  name = '';

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<DialogAddGameComponent>
    ) {}



  onNoClick(): void {
    this.dialogRef.close();
  }
}
