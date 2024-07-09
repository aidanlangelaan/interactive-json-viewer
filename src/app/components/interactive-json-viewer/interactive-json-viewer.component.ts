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
  @Output() nodeClicked = new EventEmitter<string>();

  jsonObject: any = {};

  ngOnChanges(): void {
    if (!this.jsonString) return;

    this.jsonObject = this.parseJson(this.jsonString);
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

  parseJson(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON string', error);
      return null;
    }
  }
}
