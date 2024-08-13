import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularProject';
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (val.url === "/" || val.url === "/courseList" || val.url === "/individualSchedule") {
          this.showHeader = true;
          this.showFooter = true;
        }
        else {
          this.showHeader = false;
          this.showFooter = false;
        }
      }
    })
  }
}
