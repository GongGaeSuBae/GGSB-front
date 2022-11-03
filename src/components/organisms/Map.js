/*global kakao*/
import { Map, MapMarker, Polygon, Rectangle } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import $ from "jquery";

const GGSBMap = () => {
    let [paths, setPaths] = useState([]);
    let [names, setNames] = useState([]);
    let [cities, setCities] = useState([]);
    let [centers, setCenters] = useState([]);
    const [center, setCenter] = useState({lat: 36.45133, lng: 128.534086});
    const [level, setLevel] = useState(11);
    const geocoder = new kakao.maps.services.Geocoder();
    // 파일 불러오기
    useEffect(() => {
        let pthtmp = [];
        let nmtmp = [];
        let cttmp = [];
        let citytmp = [];

        $.getJSON(`${process.env.PUBLIC_URL}/assets/TKmap.geojson`, function(geojson) {
            var data = geojson.features;
            var coordinates = [];
            var name = '';
            var cityCoord = ''
            $.each(data, function(index, val) {
                coordinates = val.geometry.coordinates;
                name = val.properties.EMD_NM;
                cityCoord = displayArea(coordinates, name);
                nmtmp.push(name);
                setNames(nmtmp);

                findCityName(cityCoord, function(res, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        citytmp.push(res[0].address_name.split(' ')[1]);
                        setCities(citytmp);
                    }
                });
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

            var centerCoord = centroid(points);
            cttmp.push(centerCoord);
            setCenters(cttmp);

            return centerCoord;
        }
    }, []);

    function centroid(points) {
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

    function findCityName(center, callback) {
        geocoder.coord2RegionCode(center.lng, center.lat, callback);
    }

    var mouseOverOpt = {
        fillColor: 'skyblue',
        fillOpacity: 0.8
    }

    var mouseOutOpt = {
        fillColor: 'gray',
        fillOpacity: 0.8
    }

    var mouseClickOpt = {
        fillColor: 'blue',
        fillOpacity: 0.8
    }

    const onMouseOverEvt = (e) => {
        e.setOptions(mouseOverOpt)
    }

    const onMouseOutEvt = (e) => {
        e.setOptions(mouseOutOpt)
    }
    const onClickEvt = (e, idx) => {
        setCenter(centers[idx]);
        setLevel(level > 9 ? level-2 : level);
        e.setOptions(mouseClickOpt);
    }

    return (<Map id="GGSBMap"
        level={level}
        onZoomChanged={(map) => {
            setLevel(map.getLevel());
        }}
        center={center}
        style={{ width: "100%", height: "1024px" }}>
            {paths.length !== 0 ? paths.map((path, idx) =>
            <Polygon
            onMouseover={(e)=> onMouseOverEvt(e)}
            onMouseout={(e)=> onMouseOutEvt(e)}
            onClick={(e) => onClickEvt(e, idx)}
            path={path}
            strokeWeight={2}
            strokeColor={'black'}
            strokeOpacity={0.8}
            fillColor={'gray'}
            fillOpacity={0.7}
            />
            ) : <></>}
        </Map>);
}

export { GGSBMap }