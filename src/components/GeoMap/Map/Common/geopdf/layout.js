export var layouts = [];

export var layout = {
    name: "制图图层",
    value: {}, //geojson
    type: "UnKnowed"
};

export function clearLayout(map){
    if (!map) return;
    layouts.forEach(geometry => {
        if(map.getLayer(geometry.name)) map.removeLayer(geometry.name);    
    });
}

export function addLayout(map, layout) {
    if (!map) return;
    if (Object.keys(layout) <= 0) return;

    //clearLayout(map);

    layouts.push(layout);
    layouts.forEach(geometry => {
        //if(map.getLayer(geometry.name)) map.removeLayer(geometry.name);    
        if (geometry.type == "LineString") {
            map.addLayer({
                "id": geometry.name,
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": geometry.value
                },
                'layout': {},
                "filter": ["==", "$type", "LineString"],
                'paint': {
                    'line-color': '#000000',
                    'line-opacity': 1.0
                }
            });
        } else if (geometry.type == "Polygon") {
            map.addLayer({
                "id": geometry.name,
                "type": "fill",
                "source": {
                    "type": "geojson",
                    "data": geometry.value
                },
                'layout': {},
                "filter": ["==", "$type", "Polygon"],
                'paint': {
                    'fill-color': '#FFFFFF',
                    'fill-opacity': 1.0
                }
            });
        }

    });
}