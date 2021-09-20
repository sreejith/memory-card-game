import { PlayerDetails } from './../../inerfaces/playerDetails';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss']
})
export class PlayerModalComponent implements OnInit {

  form: FormGroup;
  player1 = '';
  player2 = '';

  players: PlayerDetails[] = [];

  constructor(public dialogRef: MatDialogRef<PlayerModalComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
              this.form = this.fb.group({
                player1: ['', Validators.required],
                player2: ['', Validators.required]
              });
  }

  ngOnInit(): void {
  }

  startGame(): void {
    if (this.form.valid) {
      const player1Data: PlayerDetails = {
        playerIndex: 0,
        playerId: 1,
        playerName: this.form.get('player1')?.value,
        score: 0,
        isCurrentPlayer: false
      };
      const player2Data: PlayerDetails = {
        playerIndex: 1,
        playerId: 2,
        playerName: this.form.get('player2')?.value,
        score: 0,
        isCurrentPlayer: false
      };
      this.players.push({...player1Data});
      this.players.push({...player2Data});
      this.data = this.players;
      this.dialogRef.close(this.data);
    }
  }

}
