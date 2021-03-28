import { PlayerDetails } from './inerfaces/playerDetails';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDetail } from './inerfaces/cardDetail';
import { PlayerModalComponent } from './modal/player-modal/player-modal.component';
import { WinnerModalComponent } from './modal/winner-modal/winner-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  players: PlayerDetails[] = [];
  currentPlayer: any;
  winner: any;

  cardsArry: CardDetail[] = [];
  flippedCardsArry: CardDetail[] = [];
  matchedCount = 0;
  cardImageIdArry = [ '1080', '1069', '175', '250', '316', '564', '525', '542'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.winner = null;
    if (this.players.length === 0) {
      this.getPlayerDetails();
    }
    this.displayCards();
  }

  displayCards(): void {
    this.cardsArry = [];
    this.cardImageIdArry.forEach((id) => {
      const cardData: CardDetail = {
        imageId: id,
        state: 'default',
        imageURL: 'https://picsum.photos/id/' + id + '/367/267'
      };
      this.cardsArry.push({ ...cardData });
      this.cardsArry.push({ ...cardData });
    });

    this.cardsArry.pop();

    this.cardsArry = this.shuffleArray(this.cardsArry);
  }

  shuffleArray(arry: any[]): any[] {
    for (let i = arry.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arry[i], arry[j]] = [arry[j], arry[i]];
    }
    return arry;
  }

  cardClicked(index: number): void {
    const cardInformation = this.cardsArry[index];

    if (cardInformation.state === 'default' && this.flippedCardsArry.length < 2) {
      cardInformation.state = 'flipped';
      this.flippedCardsArry.push(cardInformation);

      if (this.flippedCardsArry.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInformation.state === 'flipped') {
      cardInformation.state = 'default';
      this.flippedCardsArry.pop();
    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCardsArry[0];
      const cardTwo = this.flippedCardsArry[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCardsArry = [];

      if (nextState === 'matched') {
        this.matchedCount++;
        if (this.players[0].isCurrentPlayer) {
          this.players[0].score++;
        } else if (this.players[1].isCurrentPlayer) {
          this.players[1].score++;
        }

        if (this.matchedCount === this.cardImageIdArry.length - 1) {
          this.winner = this.players.reduce((prevObj, currentObj) => (prevObj.score > currentObj.score) ? prevObj : currentObj);
          const winnerDialogRef = this.dialog.open(WinnerModalComponent, {
            disableClose: true,
            data: this.winner
          });
          winnerDialogRef.afterClosed().subscribe(result => {
            if (result === 'replayGame') {
              this.players.forEach( player => player.score = 0 );
              this.matchedCount = 0;
              this.displayCards();
            }
            if (result === 'startNewGame') {
              this.players = [];
              this.matchedCount = 0;
              this.displayCards();
              this.getPlayerDetails();
            }
          });
        }
      } else {
        if (this.players[0].isCurrentPlayer) {
          this.players[0].isCurrentPlayer = false;
          this.players[1].isCurrentPlayer = true;
        } else if (this.players[1].isCurrentPlayer) {
          this.players[1].isCurrentPlayer = false;
          this.players[0].isCurrentPlayer = true;
        }
      }

    }, 1000);
  }

  getPlayerDetails(): void {
    const dialogRef = this.dialog.open(PlayerModalComponent, {
      disableClose: true,
      data: this.players
    });

    dialogRef.afterClosed().subscribe(result => {
      this.players = result;
      this.players[0].isCurrentPlayer = true;
    });
  }

}
