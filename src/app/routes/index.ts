import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <h1>Home</h1>

    <a routerLink="/about">About</a><br>
`
})
export default class HomeComponent { }
