/*global kakao*/
import { useEffect } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";

import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../redux/Action";
import { findCityName, mouseEvtStyle } from "../../utils";
import { useMapInfo, useMultipleWaterQuality } from "../../hooks";

const GGSBMap = () => {
    const { districts, centers, paths } = useMapInfo();
    const { multipleWaterQuality } = useMultipleWaterQuality();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    
    useEffect(() => {
        if(districts.length !== 0 && centers.length !== 0 && paths.length !== 0)    
            dispatch(Action.loading());
    }, [districts, centers, paths, dispatch]);

    const onClickEvt = (e, idx) => {
        dispatch(Action.changeMapCenter(centers[idx]));
        findCityName(centers[idx], (res, status) => {
            if (status === kakao.maps.services.Status.OK) {
                if (res[0].region_2depth_name === '포항시 북구' || res[0].region_2depth_name === '포항시 남구')
                    dispatch(Action.dispatchSearchCity('포항시'));
                else
                dispatch(Action.dispatchSearchCity(res[0].region_2depth_name));
                dispatch(Action.dispatchSearchDistrict(res[0].region_3depth_name));
            }
        });

        dispatch(Action.changeMapLevel(state.mapInfo.level > 9 ? state.mapInfo.level-2 : state.mapInfo.level));
        var color = mapAreaColor(districts[idx]);
        if (color === 'white' || color === '#FFB562') e.setOptions(mouseEvtStyle.click.normal);
        else if (color === 'skyblue' || color === 'blue') e.setOptions(mouseEvtStyle.click.good);
        else e.setOptions(mouseEvtStyle.click.bad);
        dispatch(Action.tabClosed());
    }
    
    const mapAreaColor = (dttmp) => {
        if (multipleWaterQuality !== null) {
            var idx = multipleWaterQuality.findIndex(obj => obj.district === dttmp);
            var wq = multipleWaterQuality[idx];
            if(idx === -1) 
                if(state.searchArea.district === dttmp) return '#FFB562' 
                else return 'white'
            
            if(wq !== undefined) {
                if(wq.tbVal <= 0.5 && wq.clVal <= 4 && (wq.phval >= 5.8 && wq.phval <= 8.5))
                    if(state.searchArea.district === dttmp) return 'blue'
                        else return 'skyblue';
                else if(wq.tbVal === 0 && wq.clVal === 0 && wq.tbVal === 0)
                    if(state.searchArea.district === dttmp) return '#FFB562' 
                        else return 'white'
                else
                    if(state.searchArea.district === dttmp) return '#FF8787' 
                        else return '#F8C4B4';
            }
        }
    }

    return (<Map id="GGSBMap"
        level={state.mapInfo.level}
        onZoomChanged={(map) => {
            dispatch(Action.changeMapLevel(map.getLevel()));
        }}
        center={state.mapInfo.center}
        style={{ width: "100%", height: "100vh" }}>
            {paths.length !== 0 ? paths.map((path, idx) =>
            <Polygon
            onClick={(e) => onClickEvt(e, idx)}
            path={path}
            strokeWeight={1}
            strokeColor={'#a7a9ac'}
            strokeOpacity={0.8}
            fillColor={mapAreaColor(districts[idx])}
            fillOpacity={0.6}
            />) : <></>}
        </Map>);
}

export { GGSBMap }