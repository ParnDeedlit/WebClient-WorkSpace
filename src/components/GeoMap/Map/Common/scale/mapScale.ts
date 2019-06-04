import {point, distance} from 'turf';
import Lnglat from '../../../../../utilities/geom/lonlat';
import { Extent } from '../../../../../utilities/map';

export function getScaleByLonlat(lonlat1:Lnglat, lonlat2:Lnglat) : number{
    lonlat1.fix();
    lonlat2.fix();

    let from = point([lonlat1.lng, lonlat1.lat]);
    let to = point([lonlat2.lng, lonlat2.lat]);
    
    let maxMeters = distance(from, to, 'meters');

    /* let meters = this.getRoundNum(maxMeters);
    let label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
    let scale = {
        showMeters : meters,
        trueMeters : maxMeters,
        label : label,
        unit : label
    } */
    return maxMeters;
}

export function getScaleByExtent(extent: Extent){

}

export function updateScale(scale, text, ratio) {
    scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
    scale.innerHTML = text;
}

export function getRoundNum (num) {
    let pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
        d = num / pow10;

    d = d >= 10 ? 10 :
        d >= 5 ? 5 :
        d >= 3 ? 3 :
        d >= 2 ? 2 : 1;

    return pow10 * d;
}