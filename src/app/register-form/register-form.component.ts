import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent {
  @Input() value: String;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() label: string;
  @Output() isFilledChanged = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  onAdd(e: Event) {
    this.valueChange.emit((<HTMLInputElement>e.target).value);
    this.isFilledChanged.emit(this.label);
  }
}
