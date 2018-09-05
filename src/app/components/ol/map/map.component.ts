import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Map, View } from 'ol';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'ls-map',
  template: '<div #mapContainer [style.width]="width" [style.height]="height"></div>',
  styles: [ 'div { border: 1px solid grey; }' ]
})
export class MapComponent implements OnInit {

  @Input()
  width  = '100%';

  @Input()
  height = '100%';

  @ViewChild('mapContainer')
  mapContainer: ElementRef;

  private mapInstance: any;

  constructor() { }

  ngOnInit() {

    this.mapInstance = new Map({
      target: this.mapContainer.nativeElement,
      layers: [ new TileLayer({ source: new OSM() }) ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
      this.mapInstance.getView().animate({center: coords, zoom: 10});
    });
  }

}
