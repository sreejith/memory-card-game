import { PlayerDetails } from './../../inerfaces/playerDetails';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss']
})
export class PlayerModalComponent implements OnInit {

  player1 = '';
  player2 = '';

  players: PlayerDetails[] = [];

  constructor(public dialogRef: MatDialogRef<PlayerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  startGame(): void {
    const player1Data: PlayerDetails = {
      playerIndex: 0,
      playerId: 1,
      playerName: this.player1,
      score: 0,
      isCurrentPlayer: false
    };
    const player2Data: PlayerDetails = {
      playerIndex: 1,
      playerId: 2,
      playerName: this.player2,
      score: 0,
      isCurrentPlayer: false
    };
    this.players.push({...player1Data});
    this.players.push({...player2Data});
    this.data = this.players;
    this.dialogRef.close(this.data);
  }

}
