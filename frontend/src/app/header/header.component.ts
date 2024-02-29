import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  show_sidebar:boolean = false;
  isDropdownOpen: boolean = false;
  @ViewChild('categoryDropdown') categoryDropdown: ElementRef<any> | undefined;

  constructor(){}

  toggleSidebar(){
    this.show_sidebar = !this.show_sidebar;
    console.log(this.show_sidebar)

  }

  toggleDropdown(event: Event) {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation();
  }

  closeDropdown(event: Event) {
    if (!(event.target === this.categoryDropdown?.nativeElement)){
      this.isDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    window.addEventListener('click', (event) => {
      this.closeDropdown(event);
    });
  }
}


