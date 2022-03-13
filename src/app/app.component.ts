import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/Services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CardGameApp';
  
}

