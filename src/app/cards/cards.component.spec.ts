import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SharedService } from 'src/Services/shared.service';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let requestServiceSpy: jasmine.SpyObj<SharedService>;


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
    requestServiceSpy=TestBed.get(SharedService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call sortcards and return list of cards", fakeAsync(() => {
    const response: string[] =["4T, PT, RT, 2D, 8S, JS, 3C, AC, 4H, 10H, KH"];
    const request:string="3C,JS,2D,PT,10H,KH,8S,4T,AC,4H,RT";
    let spy=spyOn(requestServiceSpy, 'getSortedCards').and.returnValue(of(response));
    let subSpy=spyOn(requestServiceSpy.getSortedCards(request),'subscribe');
    component.SortCards();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(component.deckOfCards).toEqual(response);
  }));
  
});
