import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.scss']
})
export class WinnerModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WinnerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  replayGame(): void {
    this.dialogRef.close('replayGame');
  }

  startNewGame(): void {
    this.dialogRef.close('startNewGame');
  }

}
