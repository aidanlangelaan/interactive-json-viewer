import { Component } from '@angular/core';
import { InteractiveJsonViewerComponent } from './components/interactive-json-viewer/interactive-json-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InteractiveJsonViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'interactive-json-viewer';

  jsonExample1: string = '';
  jsonExample2: string = '';
  clickedNodePath: string = '';

  constructor() {
    this.loadExampleFile('./assets/files/example_1.json').then(
      (value: string) => {
        this.jsonExample1 = value;
      }
    );
    this.loadExampleFile('./assets/files/example_2.json').then(
      (value: string) => {
        this.jsonExample2 = value;
      }
    );
  }

  onNodeClicked(path: string): void {
    this.clickedNodePath = path;
  }

  private loadExampleFile = (path: string) =>
    fetch(path).then((res) => res.text());
}
