import { Map, MapMarker } from "react-kakao-maps-sdk";

const GGSBMap = () => {
    return (<Map
        level={11}
        center={{ lat: 35.85133, lng: 127.734086 }}
        style={{ width: "100%", height: "1024px" }}>
        </Map>);
}

export { GGSBMap }