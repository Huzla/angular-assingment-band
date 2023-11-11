import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandEnrichmentService } from './services/band-enrichment.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IBand, IIncompleteBand } from './interfaces/band.interface';
import { band, expected } from './data/assignment-data';

@Component({
  selector: 'app-task1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task1.component.html'
})
export class Task1Component {
  incompleteBand$: BehaviorSubject<IIncompleteBand>;
  expectedBand$: Observable<IBand>;
  json = JSON;

  private _bandEnrichmentService: BandEnrichmentService;

  constructor(bandEnrichmentService: BandEnrichmentService)
  {
    this.incompleteBand$ = new BehaviorSubject<IIncompleteBand>(band);
    this.expectedBand$  = of(expected);

    this._bandEnrichmentService = bandEnrichmentService;
  }

  onClick() {
    this.incompleteBand$.next(this._bandEnrichmentService.addPlays(this._bandEnrichmentService.addAll(band)))
  }
}
