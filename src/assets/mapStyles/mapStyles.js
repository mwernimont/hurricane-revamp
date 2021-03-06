// Since the Mapbox gl wants the tile request to have an array containing the URL for the tiles, we need to
// grab the URL for the correct tier from the environment variables and prepackage the result as an array
const hruTileUrl = [];
hruTileUrl.push(process.env.VUE_APP_HRU_TILE_URL);

export default {
    style: {
        version: 8,
        sources: {
            basemap: {
                type: 'vector',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/misctilesets/usstatecounties/{z}/{x}/{y}.pbf'],
                'minzoom': 2, // setting this to equal the minzoom of main map, real tile extent is 2
                'maxzoom': 6  // setting this to equal the maxzoom of main map, real tile extent is 10
            },
            openmaptiles: {
                type: 'vector',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/openmaptiles/baselayers/{z}/{x}/{y}.pbf'],
                'minzoom': 0,
                'maxzoom': 14
            },
            hillshade: {
                type: 'raster',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/openmaptiles/omthillshade/{z}/{x}/{y}.png'],
                'minzoom': 0,
                'maxzoom': 12,
                'tileSize': 256
            }
        },
        'sprite': '',
        'glyphs': 'https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf',
        'layers': [
            {
                'id': 'background',
                'paint': {
                    'background-color': 'hsl(47, 26%, 88%)'
                },
                'type': 'background',
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['in', 'class', 'residential', 'suburb', 'neighbourhood']
                ],
                'id': 'landuse-residential',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'hsl(47, 13%, 86%)',
                    'fill-opacity': 0.7
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'landuse',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonLayerToggleStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': true
            },
            {
                'filter': ['==', 'class', 'grass'],
                'id': 'landcover_grass',
                'paint': {
                    'fill-color': 'hsl(82, 46%, 72%)',
                    'fill-opacity': 0.45
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'landcover',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonLayerToggleStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': true
            },
            {
                'filter': ['==', 'class', 'wood'],
                'id': 'landcover_wood',
                'paint': {
                    'fill-color': 'hsl(82, 46%, 72%)',
                    'fill-opacity': {
                        'base': 1,
                        'stops': [
                            [8, 0.6],
                            [23, 1]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'landcover',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonLayerToggleStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': true
            },
            {
                'filter': ['all', ['in', 'class', 'sand']],
                'id': 'landcover_sand',
                'metadata': {},
                'paint': {
                    'fill-antialias': false,
                    'fill-color': 'rgba(232, 214, 38, 1)',
                    'fill-opacity': 0.3
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'landcover',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': true
            },
            {
                'filter': ['==', 'class', 'agriculture'],
                'id': 'landuse',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': '#eae0d0'
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'landuse',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['==', 'class', 'national_park'],
                'id': 'landuse_national_park',
                'paint': {
                    'fill-color': '#E1EBB0',
                    'fill-opacity': {
                        'base': 1,
                        'stops': [
                            [5, 0],
                            [9, 0.75]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'landcover',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': true
            },
            {
                'id': 'hill shade',
                'type': 'raster',
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'hillshade',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': true,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'tunnel']
                ],
                'id': 'waterway-tunnel',
                'paint': {
                    'line-color': 'hsl(205, 56%, 73%)',
                    'line-dasharray': [3, 3],
                    'line-gap-width': {
                        'stops': [
                            [12, 0],
                            [20, 6]
                        ]
                    },
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [20, 2]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['!in', 'brunnel', 'tunnel', 'bridge'],
                    ['!=', 'intermittent', 1]
                ],
                'id': 'waterway',
                'paint': {
                    'line-color': 'hsl(205, 56%, 73%)',
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [20, 8]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['!in', 'brunnel', 'tunnel', 'bridge'],
                    ['==', 'intermittent', 1]
                ],
                'id': 'waterway_intermittent',
                'paint': {
                    'line-color': 'hsl(205, 56%, 73%)',
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [20, 8]
                        ]
                    },
                    'line-dasharray': [2, 1]
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'tunnel'],
                    ['==', 'class', 'transit']
                ],
                'id': 'tunnel_railway_transit',
                'layout': {
                    'line-cap': 'butt',
                    'line-join': 'miter'
                },
                'paint': {
                    'line-color': 'hsl(34, 12%, 66%)',
                    'line-dasharray': [3, 3],
                    'line-opacity': {
                        'base': 1,
                        'stops': [
                            [11, 0],
                            [16, 1]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'id': 'building',
                'paint': {
                    'fill-antialias': true,
                    'fill-color': 'rgba(232, 211, 190, 1)',
                    'fill-opacity': {
                        'base': 1,
                        'stops': [
                            [13, 0],
                            [15, 1]
                        ]
                    },
                    'fill-outline-color': {
                        'stops': [
                            [15, 'rgba(212, 177, 146, 0)'],
                            [16, 'rgba(212, 177, 146, 0.5)']
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'building',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['==', '$type', 'Point'],
                'id': 'housenumber',
                'layout': {
                    'text-field': '{housenumber}',
                    'text-font': ['Noto Sans Regular'],
                    'text-size': 10
                },
                'minzoom': 17,
                'maxzoom': 23,
                'paint': {
                    'text-color': 'rgba(212, 177, 146, 1)'
                },
                'source': 'openmaptiles',
                'source-layer': 'housenumber',
                'type': 'symbol',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'id': 'road_area_pier',
                'type': 'fill',
                'metadata': {},
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['==', 'class', 'pier']
                ],
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'hsl(47, 26%, 88%)',
                    'fill-antialias': true
                },
                'minzoom': 3,
                'maxzoom': 23,
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'id': 'road_pier',
                'type': 'line',
                'metadata': {},
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'pier']
                ],
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': 'hsl(47, 26%, 88%)',
                    'line-width': {
                        'base': 1.2,
                        'stops': [
                            [15, 1],
                            [17, 4]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['in', 'brunnel', 'bridge']
                ],
                'id': 'road_bridge_area',
                'layout': {},
                'paint': {
                    'fill-color': 'hsl(47, 26%, 88%)',
                    'fill-opacity': 0.5
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'path', 'track']
                ],
                'id': 'road_path',
                'layout': {
                    'line-cap': 'square',
                    'line-join': 'bevel'
                },
                'paint': {
                    'line-color': 'hsl(0, 0%, 97%)',
                    'line-dasharray': [1, 1],
                    'line-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 10]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'minor', 'service']
                ],
                'id': 'road_minor',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': 'hsl(0, 0%, 97%)',
                    'line-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                'minzoom': 13,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'tunnel'],
                    ['==', 'class', 'minor_road']
                ],
                'id': 'tunnel_minor',
                'layout': {
                    'line-cap': 'butt',
                    'line-join': 'miter'
                },
                'paint': {
                    'line-color': '#efefef',
                    'line-dasharray': [0.36, 0.18],
                    'line-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'tunnel'],
                    ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk']
                ],
                'id': 'tunnel_major',
                'layout': {
                    'line-cap': 'butt',
                    'line-join': 'miter'
                },
                'paint': {
                    'line-color': '#fff',
                    'line-dasharray': [0.28, 0.14],
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['in', 'class', 'runway', 'taxiway']
                ],
                'id': 'aeroway-area',
                'layout': {
                    'visibility': 'visible'
                },
                'metadata': {
                    'mapbox:group': '1444849345966.4436'
                },
                'paint': {
                    'fill-color': 'rgba(255, 255, 255, 1)',
                    'fill-opacity': {
                        'base': 1,
                        'stops': [
                            [13, 0],
                            [14, 1]
                        ]
                    }
                },
                'minzoom': 4,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'aeroway',
                'type': 'fill',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['in', 'class', 'taxiway'],
                    ['==', '$type', 'LineString']
                ],
                'id': 'aeroway-taxiway',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round',
                    'visibility': 'visible'
                },
                'metadata': {
                    'mapbox:group': '1444849345966.4436'
                },
                'minzoom': 12,
                'maxzoom': 23,
                'paint': {
                    'line-color': 'rgba(255, 255, 255, 1)',
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.5,
                        'stops': [
                            [12, 1],
                            [17, 10]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'aeroway',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['in', 'class', 'runway'],
                    ['==', '$type', 'LineString']
                ],
                'id': 'aeroway-runway',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round',
                    'visibility': 'visible'
                },
                'metadata': {
                    'mapbox:group': '1444849345966.4436'
                },
                'minzoom': 4,
                'maxzoom': 23,
                'paint': {
                    'line-color': 'rgba(255, 255, 255, 1)',
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.5,
                        'stops': [
                            [11, 4],
                            [17, 50]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'aeroway',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'trunk', 'primary']
                ],
                'id': 'road_trunk_primary',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#fff',
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'secondary', 'tertiary']
                ],
                'id': 'road_secondary_tertiary',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#fff',
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [6, 0.5],
                            [20, 20]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'class', 'motorway']
                ],
                'id': 'road',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': 'hsl(0, 0%, 100%)',
                    'line-offset': 0,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [16, 10]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': true
            },
            {
                'filter': ['all', ['==', 'class', 'transit'],
                    ['!=', 'brunnel', 'tunnel']
                ],
                'id': 'railway-transit',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'hsl(34, 12%, 66%)',
                    'line-opacity': {
                        'base': 1,
                        'stops': [
                            [11, 0],
                            [16, 1]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['==', 'class', 'rail'],
                'id': 'railway',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'hsl(34, 12%, 66%)',
                    'line-opacity': {
                        'base': 1,
                        'stops': [
                            [11, 0],
                            [16, 1]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'bridge']
                ],
                'id': 'waterway-bridge-case',
                'layout': {
                    'line-cap': 'butt',
                    'line-join': 'miter'
                },
                'paint': {
                    'line-color': '#bbbbbb',
                    'line-gap-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    },
                    'line-width': {
                        'base': 1.6,
                        'stops': [
                            [12, 0.5],
                            [20, 10]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'bridge']
                ],
                'id': 'waterway-bridge',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': 'hsl(205, 56%, 73%)',
                    'line-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'bridge'],
                    ['==', 'class', 'minor_road']
                ],
                'id': 'bridge_minor case',
                'layout': {
                    'line-cap': 'butt',
                    'line-join': 'miter'
                },
                'paint': {
                    'line-color': '#dedede',
                    'line-gap-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    },
                    'line-width': {
                        'base': 1.6,
                        'stops': [
                            [12, 0.5],
                            [20, 10]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'bridge'],
                    ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk']
                ],
                'id': 'bridge_major case',
                'layout': {
                    'line-cap': 'butt',
                    'line-join': 'miter'
                },
                'paint': {
                    'line-color': '#dedede',
                    'line-gap-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    },
                    'line-width': {
                        'base': 1.6,
                        'stops': [
                            [12, 0.5],
                            [20, 10]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'bridge'],
                    ['==', 'class', 'minor_road']
                ],
                'id': 'bridge_minor',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#efefef',
                    'line-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'bridge'],
                    ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk']
                ],
                'id': 'bridge_major',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#fff',
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },

            {
                'filter': ['all', ['==', '$type', 'Point'],
                    ['==', 'rank', 1]
                ],
                'id': 'poi_label',
                'layout': {
                    'icon-size': 1,
                    'text-anchor': 'top',
                    'text-field': '{name:latin}\n{name:nonlatin}',
                    'text-font': ['Noto Sans Regular'],
                    'text-max-width': 8,
                    'text-offset': [0, 0.5],
                    'text-size': 11,
                    'visibility': 'visible'
                },
                'minzoom': 14,
                'maxzoom': 23,
                'paint': {
                    'text-color': '#666',
                    'text-halo-blur': 1,
                    'text-halo-color': 'rgba(255,255,255,0.75)',
                    'text-halo-width': 1
                },
                'source': 'openmaptiles',
                'source-layer': 'poi',
                'type': 'symbol',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['==', '$type', 'LineString'],
                'id': 'road_major_label',
                'layout': {
                    'symbol-placement': 'line',
                    'text-field': '{name:latin} {name:nonlatin}',
                    'text-font': ['Noto Sans Regular'],
                    'text-letter-spacing': 0.1,
                    'text-rotation-alignment': 'map',
                    'text-size': {
                        'base': 1.4,
                        'stops': [
                            [10, 8],
                            [20, 14]
                        ]
                    },
                    'text-transform': 'uppercase'
                },
                'paint': {
                    'text-color': '#000',
                    'text-halo-color': 'hsl(0, 0%, 100%)',
                    'text-halo-width': 2
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'transportation_name',
                'type': 'symbol',
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['!=', 'intermittent', 1]
                ],
                'id': 'water - base layer',
                'paint': {
                    'fill-color': 'hsl(205, 56%, 73%)'
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'water',
                'type': 'fill',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': true,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': true
            },

            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['==', 'intermittent', 1]
                ],
                'id': 'water_intermittent',
                'paint': {
                    'fill-color': 'hsl(205, 56%, 73%)',
                    'fill-opacity': 0.7
                },
                'minzoom': 3,
                'maxzoom': 23,
                'source': 'openmaptiles',
                'source-layer': 'water',
                'type': 'fill',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': false,
                'showButtonProjectSpecific': false,
                'inLegend': false
            },
            {
                'id': 'Neighboring Countries',
                'type': 'fill',
                'source': 'basemap',
                'minzoom': 2,
                'maxzoom': 24,
                'source-layer': 'neighboringcountry',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'hsl(47, 26%, 88%)'
                },
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['!=', 'intermittent', 1]
                ],
                'id': 'water',
                'paint': {
                    'fill-color': 'hsl(205, 56%, 73%)'
                },
                'source': 'openmaptiles',
                'source-layer': 'water',
                'type': 'fill',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false
            },
            {
                'id': 'Counties',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'counties',
                'minzoom': 6,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgb(0,0,0)',
                    'line-dasharray': [4, 3]
                },
                'showButtonLayerToggle': true
            },
            {
                'id': 'states',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'states',
                'minzoom': 2,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'visible',
                },
                'paint': {
                    'line-color': 'rgb(0,0,0)'
                }

            },
            {
                'filter': ['all', ['==', '$type', 'Point'],
                    ['==', 'class', 'city']
                ],
                'id': 'place_label_city',
                'layout': {
                    'text-field': '{name:latin}\n{name:nonlatin}',
                    'text-font': ['Noto Sans Regular'],
                    'text-max-width': 10,
                    'text-size': {
                        'stops': [
                            [3, 12],
                            [8, 16]
                        ]
                    }
                },
                'maxzoom': 16,
                'minzoom': 5,
                'paint': {
                    'text-color': 'hsl(0, 0%, 0%)',
                    'text-halo-blur': 0,
                    'text-halo-color': 'hsla(0, 0%, 100%, 0.75)',
                    'text-halo-width': 2
                },
                'source': 'openmaptiles',
                'source-layer': 'place',
                'type': 'symbol',
                'showButtonLayerToggle': false
            }
        ]
    }
};