/*global kakao*/
import { Map, MapMarker, Polygon, Rectangle } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import $ from "jquery";

const GGSBMap = () => {
    let [paths, setPaths] = useState([]);
    // 파일 불러오기
    useEffect(() => {
        let pthtmp = [];
        $.getJSON(`${process.env.PUBLIC_URL}/assets/TKmap.geojson`, function(geojson) {
            var data = geojson.features;
            var coordinates = [];
            var name = '';

            $.each(data, function(index, val) {
                coordinates = val.geometry.coordinates;
                name = val.properties.EMD_KOR_NM;
                displayArea(coordinates, name);
            })
        })
        // 도형 그리기
        function displayArea(coordinates, name) {
            var path = [];
            var points = [];
    
            $.each(coordinates[0], function(idx, coord) {
                $.each(coord, function(cdidx, cd) {
                    var point = new Object();
                    point.x = cd[1];
                    point.y = cd[0];
                    points.push(point);
                    path.push({ lat: point.x, lng: point.y });
                })
            })
            pthtmp.push(path);
            setPaths(pthtmp);
        }
    }, []);


    return (<Map 
        level={11}
        center={{lat: 36.45133, lng: 128.534086}}
        style={{ width: "100%", height: "1024px" }}>
            {paths.length !== 0 ? paths.map((path) =>
            <Polygon
            path={path}
            strokeWeight={2}
            strokeColor={'#b26bb2'}
            strokeOpacity={0.8}
            fillColor={'#f9f'}
            fillOpacity={0.7}
            />
            ) : <></>}
        </Map>);
}

export { GGSBMap }