import { useEffect, useState } from 'react';
import { centroid } from '../utils/Location';
import $ from "jquery";

const useMapInfo = () => {
    const [ districts, setDistricts ] = useState([]);
    const [ centers, setCenters ] = useState([]);
    const [ paths, setPaths ] = useState([]);

    useEffect(() => {
        let dttmp = [];
        let pthtmp = [];
        let cttmp = [];

        $.getJSON(`${process.env.PUBLIC_URL}/assets/TKmap.geojson`, function(geojson) {
            var data = geojson.features;
            var coordinates = [];
            var name = '';

            $.each(data, function(index, val) {
                coordinates = val.geometry.coordinates;
                name = val.properties.EMD_NM;
                displayArea(coordinates, name);
                dttmp.push(name);
                setDistricts(dttmp);
            })
        })

        // 도형 그리기
        function displayArea(coordinates, name) {
            var path = [];
            var points = [];
    
            $.each(coordinates[0], function(idx, coord) {
                $.each(coord, function(cdidx, cd) {
                    var point = {};
                    point.x = cd[1];
                    point.y = cd[0];
                    points.push(point);
                    path.push({ lat: point.x, lng: point.y });
                })
            })
            pthtmp.push(path); 
            setPaths(pthtmp);

            var centerCoord = centroid(points);
            cttmp.push(centerCoord);
            setCenters(cttmp);
        }
    }, []);
    return { districts, centers, paths };
}

export { useMapInfo }