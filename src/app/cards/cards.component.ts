import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/Model/Cards';
import { Suit } from 'src/Model/Suit';
import { SharedService } from 'src/Services/shared.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('3s ease-out', style({ opacity: '1' })),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('180ms', animate('600ms ease-out', style({ opacity: 1 })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true }
        )
      ])]),
  ],
})
export class CardsComponent {

  suitsList: Suit[] = [];
  suitValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  specialList = ["T"];
  specialSuitValues = ["4","2","S", "P", "R"];
  shuffledCards: Card[] = [];
  sortedCards: Card[] = [];
  showSorted: boolean = false;
  deckOfCards = new Array();
  numberofCards: number = 11;
  items:any = [];
  constructor(private sharedService: SharedService) {
    this.suitsList = [
      new Suit("D", "&diams;", "Red"),
      new Suit("S", "&spades;", "Black"),
      new Suit("C", "&clubs;", "Black"),
      new Suit("H", "&hearts;", "Red"),
    ]
  }
  shuffleCards() {
    this.showSorted = false;
    this.deckOfCards = [];
    this.shuffledCards = [];
    this.addSuitList();
    this.addSpecialSuitList();
    this.selectShuffledCards();

  }
  addSuitList() {
    for (let i = 0; i < this.suitsList.length; i++) {
      for (let x = 0; x < this.suitValues.length; x++) {
        let card: Card =
        {
          value: this.suitValues[x],
          name: this.suitsList[i].suitname,
          color: this.suitsList[i].suitColor,
          icon: this.suitsList[i].suiticon,
          namevalue: `${this.suitValues[x]}${this.suitsList[i].suitname}`
        };
        this.deckOfCards.push(card);
      }

    }
  }
  addSpecialSuitList() {
    for (let i = 0; i < this.specialList.length; i++) {
      for (let x = 0; x < this.specialSuitValues.length; x++) {
        let card: Card =
        {
          value: this.specialSuitValues[x],
          name: this.specialList[i],
          color: '',
          icon: '',
          namevalue: `${this.specialSuitValues[x]}${this.specialList[i]}`
        };
        this.deckOfCards.push(card);
      }
    }
  }
  selectShuffledCards() {
    for (let i = this.deckOfCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = this.deckOfCards[i];
      this.deckOfCards[i] = this.deckOfCards[j];
      this.deckOfCards[j] = temp;
    }
   
    for (let i = 0; i < this.numberofCards; i++) {
      this.shuffledCards.push(this.deckOfCards[i])
    }
  }

  SortCards() {
    let cardValues = this.shuffledCards.map(function (card: Card) {
      return card.namevalue;
    }).join(",");
    this.sharedService.getSortedCards(JSON.stringify(cardValues)).subscribe(response => {
      this.showSorted = true;
      this.sortedCards = [];
      for (var i = 0; i <= response?.length; i++) {
        let item = this.shuffledCards.find((card: Card) => card.namevalue === response[i]);
        if (item)
          this.sortedCards.push(item);
      }
    });
  }

}
