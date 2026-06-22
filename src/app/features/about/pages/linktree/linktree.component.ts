import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-linktree',
  imports: [MatIcon, RouterLink],
  templateUrl: './linktree.component.html',
  styleUrl: './linktree.component.scss',
})
export class LinktreeComponent {}
