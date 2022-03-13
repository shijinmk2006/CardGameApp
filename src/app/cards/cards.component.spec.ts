import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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
  
  it("should call sortcards and return list of cards", fakeAsync(() => {
    const mockresponse: string[] =["3C","JS","2D","PT","10H","KH","8S","4T","AC","4H","RT"];
    const requestParams:string="3C,JS,2D,PT,10H,KH,8S,4T,AC,4H,RT";
    let response:string[]=[];
    spyOn(cardSharedService,'getSortedCards').and.returnValue(of(mockresponse));
    cardSharedService.getSortedCards(requestParams).subscribe(res=>{response=res});
    expect(response).toEqual(mockresponse);
    
  }));

});
