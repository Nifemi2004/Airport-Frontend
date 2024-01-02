import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() variation: 'primary' | 'outline' | 'secondary' = 'primary';  
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }

  getButtonClasses(): string {
    let classes = 'button';
  
    if (this.variation === 'primary') {
      classes += ' primary';
    } else if (this.variation === 'outline') {
      classes += ' outline';
    } else if (this.variation === 'secondary') {
      classes += ' secondary';
    }
  
    return classes;
  }
}
