import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Card } from 'src/Model/Cards';
import { Suit } from 'src/Model/Suit';
import { SharedService } from 'src/Services/shared.service';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let cardSharedService: jasmine.SpyObj<SharedService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent ],
      providers: [SharedService],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cardSharedService=TestBed.get(SharedService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('should run the loop and push - addSuitList', () => {
    component.suitsList = [
      new Suit("D", "&diams;", "Red"),
      new Suit("S", "&spades;", "Black"),
      new Suit("C", "&clubs;", "Black"),
      new Suit("H", "&hearts;", "Red"),
    ] 
    component.specialSuitValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
   component.addSuitList();
   expect(component.deckOfCards.length).toEqual(52);
  });

  it('should run the loop and push - addSpecialSuitList', () => {
    component.specialList = ["T"];
    component.suitValues =  ["4","2","S", "P", "R"];
    component.addSpecialSuitList();
    expect(component.deckOfCards.length).toEqual(5);
  });
  
  it('should run the loop and push - shufflleCard', () => {
    component.suitsList = [
      new Suit("D", "&diams;", "Red"),
      new Suit("S", "&spades;", "Black"),
      new Suit("C", "&clubs;", "Black"),
      new Suit("H", "&hearts;", "Red"),
    ] 
    component.specialSuitValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    component.specialList = ["T"];
    component.suitValues =  ["4","2","S", "P", "R"];
    component.shuffleCards();
    expect(component.shuffledCards.length).toEqual(component.numberofCards);
  });
  
  
  it("should call sortcards and return list of cards", fakeAsync(() => {
    const mockresponse: string[] =["3C","JS","2D","PT","10H","KH","8S","4T","AC","4H","RT"];
    const requestParams:string="3C,JS,2D,PT,10H,KH,8S,4T,AC,4H,RT";
    let response:string[]=[];
    spyOn(cardSharedService,'getSortedCards').and.returnValue(of(mockresponse));
    cardSharedService.getSortedCards(requestParams).subscribe(res=>{response=res});
    expect(response).toEqual(mockresponse);
    
  }));
   
});
