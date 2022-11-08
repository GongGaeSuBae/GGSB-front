/*global kakao*/
const geocoder = new kakao.maps.services.Geocoder();

export const centroid = (points) => {
    var i, j, len, p1, p2, f, area, x, y;
        area = x = y = 0;

    for(i=0, len=points.length, j=len-1; i<len; j=i++) {
        p1 = points[i];
        p2 = points[j];

        f = p1.y * p2.x - p2.y * p1.x;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
        area += f * 3;
    }
    return { lat: x/area, lng: y/area };
}

export const findCityName = (center, callback) => {
    geocoder.coord2RegionCode(center.lng, center.lat, callback);
} 