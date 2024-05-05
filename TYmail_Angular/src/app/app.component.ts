import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomComponent } from './screens/room/room.component';
import { WinComponent } from './screens/win/win.component';
import { LoseComponent } from './screens/lose/lose.component';
import { ParticipateComponent } from './screens/participate/participate.component';
import { HeaderComponent } from './header/header.component';
import { CotolentaComponent } from './UI/cotolenta/cotolenta.component';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoomComponent, WinComponent, LoseComponent, ParticipateComponent, HeaderComponent, CotolentaComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screen:string = 'room'
}
