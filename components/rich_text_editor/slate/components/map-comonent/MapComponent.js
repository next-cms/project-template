import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapContainer = (props) => {

    return (
        <div {...props.attributes} style={{ outline: props.isSelected ? "3px solid red" : "" }}>
            {
                <MapComponent {...props} />
            }
        </div>
    )
}

const MapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        center={{ lat: props.lat, lng: props.lng }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
    </GoogleMap>
));

MapComponent.defaultProps = {
    defaultZoom: 8,
    lat: 23.8358342,
    lng: 90.3680798,
    isMarkerShown: true,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAmOiJRIqhZI8vTDHqXSijkzjyN-09qSlU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />
}

export default MapContainer;