import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent{
  @Input() value = 'default';
  @Input() type:'text' | 'password' = 'text';
  @Output() valueChange=new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(e:Event){
    this.valueChange.emit((<HTMLInputElement>e.target).value);
  }
}
