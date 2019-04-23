thanks for all of you, english is not my home language, my english description will easy.

# Result

* BuilderGroup to create the instructions;
* ExecutorGroup to run them.

acroding your help i finish my base work. thank you,

# Where I use it?

## Intent Cesium VectorTile

Due to Cesium don not support mapbox vectortile , i deside to work it out.

## Inspiration
First i use the leaflet.vectorgrid & ol.vectortile. when i compare the two method of vectortile. I think both of two are very hard to transfrom to cesium.

Until i find this [ol-mapbox-style](https://github.com/openlayers/ol-mapbox-style) && [ol-cesium](https://github.com/openlayers/ol-cesium)

The **ol-mapbox-style** is so cool, I think it the best unfical (mapbox) way to draw vectortile.  Perfect display effect & smooth load process

When i see these code, I find i can use the **ol-mapbox-style** as vt-parse to draw canvas. And I use the code to draw vt in canvas tile.
``` js
var replayGroup = new ReplayGroup(0, extent, buffer, true, 100);

for(...){
    // loop vector tile styles to every feature to draw 
    renderFeature(_replayGroup, feature, styles[j], 16);
}

replayGroup.finish();
replayGroup.replay(canvas, transform, ratote, hash,replays); 
``` 

when draw over the tile, then take this to cesium tile ImageProvider, then finish the all method.

> this is my first test to conbine openlayers & cesium & vectortile, i see the source code **stylefunction** is perfect to render vectortile in canvas.  other code to translate mvt-style is simple to convert font/width/color, but this code conside very deep to detail sush as filter & source-layer & font & sprite (especially sprite, these show the high level code)

## Bug & Disavantage
I use Cesium-ImageProvider & ol-mapbox-style/stylefunction to render vectortile, It indeed to draw the vectortile in cesium. but when some tile is on loading , some tile is over load, the mouse slide process is hard or delay.

> i find **ol-mapbox-style** show me a new method to translate `mapbox vectortile style` to ol-vectortile-style, and this code avoid slide process block.   

I will try to use the idea to deal with the block, thank you again。 you help me a lot, this code `ol-mapbox-style/stylefunction` is so cool.
