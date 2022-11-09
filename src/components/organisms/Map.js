/*global kakao*/
import { Map, Polygon } from "react-kakao-maps-sdk";

import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../redux/Action";
import { findCityName, mouseEvtStyle } from "../../utils";
import { useMapInfo } from "../../hooks";

const GGSBMap = () => {
    const { districts, centers, paths } = useMapInfo();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    
    const onMouseOverEvt = (e) => {
        e.setOptions(mouseEvtStyle.over.bad)
    }

    const onMouseOutEvt = (e) => {
        e.setOptions(mouseEvtStyle.out.bad)
    }
    
    const onClickEvt = (e, idx) => {
        dispatch(Action.changeMapCenter(centers[idx]));
        findCityName(centers[idx], (res, status) => {
            if (status === kakao.maps.services.Status.OK) {
                dispatch(Action.dispatchSearchCity(res[0].region_2depth_name));
                dispatch(Action.dispatchSearchDistrict(res[0].region_3depth_name));
            }
        });

        dispatch(Action.changeMapLevel(state.mapInfo.level > 9 ? state.mapInfo.level-2 : state.mapInfo.level));
        e.setOptions(mouseEvtStyle.click.bad);
        dispatch(Action.tabOpened());
    }

    return (<Map id="GGSBMap"
        level={state.mapInfo.level}
        onZoomChanged={(map) => {
            dispatch(Action.changeMapLevel(map.getLevel()));
        }}
        center={state.mapInfo.center}
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
            fillColor={state.searchArea.district === districts[idx] ? '#FF8787' : 'white'}
            fillOpacity={0.6}
            />
            ) : <></>}
        </Map>);
}

export { GGSBMap }