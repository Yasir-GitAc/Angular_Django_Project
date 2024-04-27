import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  show_sidebar: boolean = false;
  isDropdownOpen: boolean = false;
  usersub!: Subscription;
  isAuthenticated: boolean = false;
  userName: string = '';
  @ViewChild('categoryDropdown') categoryDropdown: ElementRef<any> | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('click', (event) => {
      this.closeDropdown(event);
    });

    this.usersub = this.authService.user.subscribe((user) => {
      console.log(user);
      console.log('!user', !user);
      console.log('!!user', !!user);
      this.isAuthenticated = !!user;
      if (user) {
        console.log('from header', user.name);
        this.userName = user.name;
      }
    });
  }

  toggleSidebar() {
    this.show_sidebar = !this.show_sidebar;
    console.log(this.show_sidebar);
  }

  toggleDropdown(event: Event) {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation();
  }

  closeDropdown(event: Event) {
    if (!(event.target === this.categoryDropdown?.nativeElement)) {
      this.isDropdownOpen = false;
    }
  }

  logoutUser() {
    this.authService.logOut();
    this.router.navigate(['/form']);
  }

  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  }
}
