/*global kakao*/
import { Map, Polygon } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import $ from "jquery";

import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../redux/Action";

const GGSBMap = () => {
    let [paths, setPaths] = useState([]);
    let [names, setNames] = useState([]);
    let [centers, setCenters] = useState([]);
    const [center, setCenter] = useState({lat: 36.45133, lng: 128.534086});
    const [level, setLevel] = useState(10);
    const geocoder = new kakao.maps.services.Geocoder();

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    
    // 파일 불러오기
    useEffect(() => {
        let pthtmp = [];
        let nmtmp = [];
        let cttmp = [];

        $.getJSON(`${process.env.PUBLIC_URL}/assets/TKmap.geojson`, function(geojson) {
            var data = geojson.features;
            var coordinates = [];
            var name = '';

            $.each(data, function(index, val) {
                coordinates = val.geometry.coordinates;
                name = val.properties.EMD_NM;
                displayArea(coordinates, name);
                nmtmp.push(name);
                setNames(nmtmp);
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

    const findCityName = (center, callback) => {
        geocoder.coord2RegionCode(center.lng, center.lat, callback);
    }

    var mouseOverOpt = {
        fillColor: '#F8C4B4',
        fillOpacity: 1
    }

    var mouseOutOpt = {
        fillColor: 'white',
        fillOpacity: 0.6
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
        findCityName(centers[idx], (res, status) => {
            if (status === kakao.maps.services.Status.OK) {
                dispatch(Action.dispatchSearchCity(res[0].region_2depth_name));
                dispatch(Action.dispatchSearchDistrict(res[0].region_3depth_name));
            }
        });

        setLevel(level > 9 ? level-2 : level);
        e.setOptions(mouseClickOpt);
        dispatch(Action.tabOpened());
    }

    // console.log(cities, names);
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
            strokeWeight={1}
            strokeColor={'#a7a9ac'}
            strokeOpacity={0.8}
            fillColor={state.district === names[idx] ? 'blue' : 'white'}
            fillOpacity={0.6}
            />
            ) : <></>}
        </Map>);
}

export { GGSBMap }