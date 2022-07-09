import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  @Input() message: string;
  @Output() close = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit(" i test other types");
  }

}
