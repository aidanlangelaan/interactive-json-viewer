import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'interactive-json-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-json-viewer.component.html',
  styleUrl: './interactive-json-viewer.component.scss',
})
export class InteractiveJsonViewerComponent {
  @Input() jsonString!: string;
  @Input() parentPath: string = '$';
  @Input() collapsed: boolean = false;

  @Output() nodeClicked = new EventEmitter<string>();
  @Output() toggleAll = new EventEmitter<boolean>();

  jsonObject: any = {};
  collapsedStates: boolean[] = [];

  ngOnChanges(): void {
    if (!this.jsonString) return;

    this.jsonObject = this.parseJson(this.jsonString);
    this.initializeCollapsedStates();
  }

  initializeCollapsedStates(): void {
    this.collapsedStates = new Array(this.getKeys(this.jsonObject).length).fill(
      this.collapsed
    );
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObjectOrArray(value: any): boolean {
    return this.isObject(value) || this.isArray(value);
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  stringify(obj: any): string {
    return JSON.stringify(obj);
  }

  buildPath(key: string, index?: number): string {
    return index !== undefined
      ? `${this.parentPath}.${key}[${index}]`
      : `${this.parentPath}.${key}`;
  }

  onNodeClick(event: Event, key: string, index?: number): void {
    event.stopPropagation();
    const path = this.buildPath(key, index);
    this.nodeClicked.emit(path);
  }

  onNodeClicked(path: string): void {
    this.nodeClicked.emit(path);
  }

  toggleCollapse(index: number, event: Event): void {
    event.stopPropagation();
    this.collapsedStates[index] = !this.collapsedStates[index];
  }

  onToggleAll(collapsed: boolean): void {
    this.collapsed = collapsed;
    this.toggleAll.emit(collapsed);
    this.initializeCollapsedStates();
  }

  parseJson(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON string', error);
      return null;
    }
  }
}
