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
  it("should call getUsers and return list of users", async(() => {
    const response: string[] =[];
    spyOn(requestServiceSpy, 'getSortedCards').and.returnValue(of(response))
    component.SortCards();
    fixture.detectChanges();
    expect(component.deckOfCards).toEqual(response);
  }));
  
});
