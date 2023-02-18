import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <h1>About</h1>

    <a routerLink="/">Home</a><br>
`
})
export default class AboutComponent { }
