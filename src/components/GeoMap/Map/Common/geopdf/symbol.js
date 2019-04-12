import turf from '@turf/turf'
import bbox from '@turf/bbox'
import { point, polygon, featureCollection } from '@turf/helpers'

/* var regLayout = {
    "type": "FeatureCollection",
    "features": [
        { "type": "Feature", "properties": { }, "geometry": { "type": "Polygon", "coordinates": [ [ [ ] ] ] } }
    ]
   }; */

export function exportSymbolGeometry(regLayout) {

}

export function splitRegLayout(regLayout) {
    var polygons = [];
    regLayout.features.forEach(item => {
        if (item.geometry.type == "Polygon") {
            item.geometry.coordinates.forEach(linering => {
                polygons.push(polygon([linering]));
            });
        }
    });
    return polygons;
}

export function parseTextLayout(polygons) {
    if (polygons.length <= 0) return null;

    var box = bbox(polygons[0]);

    var centerX = (box[0] + box[2]) / 2;
    var centerY = box[3];
    var pointCenter = point([centerX, centerY], { "position": "center" });

    var leftBottom = [box[0], box[1]];
    var rightBottom = [box[2], box[1]];
    var pointLeftBottom = point(leftBottom, { "position": "leftbottom" });
    var pointRightBottom = point(rightBottom, { "position": "rightbottom" });

    /* var collection = turf.featureCollection([
        pointCenter,
        pointLeftBottom,
        pointRightBottom
    ]); */

    var texts = [];
    texts.push(pointCenter);
    texts.push(pointLeftBottom);
    texts.push(pointRightBottom);

    return texts;
}

export function parseSymbolBox(polygons, options){
    var fix = options? options.position ? options.position : "right" : "right";
    if(polygons.length < 2) return null;

    var outerBox = bbox(polygons[0]);
    var innerBox = bbox(polygons[1]);
    
    var box = [0, 0, 0, 0];
    if(fix == "right"){
        box[0] = Math.min(outerBox[2], innerBox[2]);
        box[1] = Math.max(outerBox[1], innerBox[1]);
        box[2] = Math.max(outerBox[2], innerBox[2]);
        box[3] = Math.min(outerBox[3], innerBox[3]);
    }else if(fix == "left"){

    }else if(fix == "top"){

    }else if(fix == "bottom"){

    }
    return box;
}

/**
 * 
 * |---------------top-------------------|
 * |------|----------------------|-------|
 * |------|----------------------|-------|
 * |-left-|----------------------|-right-|
 * |------|----------------------|-------|
 * |------|----------------------|-------|
 * |-------------bottom------------------|
 *
 * @param {*} polygons 传入的图幅矩形
 * @param {*} options.position 符号放置的位置
 * @param {*} options.number 符号个数 
 * @param {*} options.width 符号宽度
 * @param {*} options.height 符号高度
 */
export function parseSymbolLayout(polygons, options) {
    if(!options) return null;
    var symbols = [];

    var box = parseSymbolBox(polygons, options);
    var position = options.position;
    var fix = options.fix;
    var number = options.number;
    
    if(fix == "center" && position == "right" && number){
        var x = (box[0] + box[2]) / 2;
        var y = box[3];
        var yStemp = (box[3] - box[1]) / number;
        for(var i = 0; i < number; i++){
            var geom = point([x, y - yStemp * i]);
            symbols.push(geom);
        }
    }
    console.log("symbol-2", symbols);
    return symbols;
}

/*
 * @param {*} polygons 传入的图幅矩形
 * @param {*} options.position 符号放置的位置
 * @param {*} options.number 符号个数 
 * @param {*} options.width 符号宽度
 * @param {*} options.height 符号高度
 * @param {*} options.fix 适应规则 center/width/height
 */
export function parseLayout(polygons, options) {
    var texts = parseTextLayout(polygons);
    var symbols = parseSymbolLayout(polygons, options);
    var all = symbols ? texts.concat(symbols) : texts;
    var collection = featureCollection(all);
    return collection;
}



