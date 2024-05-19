import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GlobalValuesService } from './shared/globalValues/global-values.service';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    SpeechRecognitionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'StreamTube';
  constructor(private readonly globalValuesService: GlobalValuesService) {}
  flag = this.globalValuesService.sideBarState;
}
