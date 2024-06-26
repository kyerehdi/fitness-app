import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scroll-picker',
  templateUrl: 'scroll-picker.component.html',
  styleUrls: ['scroll-picker.component.scss'],
})
export class ScrollPicker implements AfterViewInit {
  @ViewChild('scrollPicker', { static: true })
  scrollPicker!: ElementRef;

  blank = ' 0';

  @Input()
  value: number;

  @Input()
  list = Array(140)
    .fill(0)
    .map((_, i) => i + 60);

  @Output()
  selection = new EventEmitter<number>();

  constructor() {}
  ngAfterViewInit(): void {
    if (this.value && this.value > 60) {
      const index = this.value - 60;
      this.scrollPicker.nativeElement.scrollTop = index * 55;
    }
  }

  onScroll(event: any): void {
    const container = event.target;
    const size = this.list.length * 55;

    let index = (container.scrollTop / size) * 140;

    const isInteger = Number.isInteger(index);

    if (isInteger) {
    } else {
      index = Math.trunc(index);
    }
    if (index > 0) {
      container.children[index].style.color = '#79d7ff';
      this.selection?.emit(Number(container.children[index].innerHTML));
    }

    if (index + 1 < container.children.length) {
      container.children[index + 1].style.color = 'white';
      this.selection?.emit(Number(container.children[index].innerHTML));
    }

    if (index === 0) {
      container.children[index].style.color = '#79d7ff';
      this.selection?.emit(Number(container.children[index].innerHTML));
    }
  }
}
