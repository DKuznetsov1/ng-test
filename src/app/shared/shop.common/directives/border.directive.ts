import { Directive, Host, Optional, ElementRef, Input, HostListener, AfterViewInit, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('appBorder') color: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorderColor(this.color || 'rgba(0, 0, 0, 0)');

  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorderColor('rgba(0, 0, 0, 0)');
  }
  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'borderWidth',
      '1px');
    this.renderer.setStyle(
      this.el.nativeElement,
      'borderColor',
      'rgba(0, 0, 0, 0)');
    this.renderer.setStyle(
      this.el.nativeElement,
      'borderStyle',
      'solid');
  }

  private setBorderColor(color: string) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'borderColor',
      color);
  }
}
