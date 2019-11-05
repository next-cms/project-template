import React, { useContext, useState } from 'react';
import { Modal, Divider, InputNumber } from 'antd';
import { RTEContext } from '../../RTEContextProvider';
import ModalType from '../../core/ModalType';
import MapComponent from './MapComponent';

const ModalMap = () => {

    const [lat, setLat] = useState(23.8358342);
    const [lng, setLng] = useState(90.3680798);

    const context = useContext(RTEContext);

    const handleOk = () => {
        context.modalResolve({map: {lat, lng}});
        context.hideModal(ModalType.MAP);
    }

    const handleCancel = () => {
        context.modalReject(new Error("Canceled."));
        context.hideModal(ModalType.MAP);
    }

    return (
        <Modal
            title={"Map"}
            visible={context.mapVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            bodyStyle={{ padding: "5px" }}
        >
            <InputNumber placeholder="lat" onChange={(value) => setLat(+value)} />
            <InputNumber placeholder="lng" onChange={(value) => setLng(+value)} />

            <Divider
                style={{
                    width: "100%",
                    height: "1px"
                }}
            />

            <MapComponent
                lat={lat || 0}
                lng={lng || 0}
                // isMarkerShown
                // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmOiJRIqhZI8vTDHqXSijkzjyN-09qSlU&v=3.exp&libraries=geometry,drawing,places"
                // loadingElement={<div style={{ height: `100%` }} />}
                // containerElement={<div style={{ height: `300px` }} />}
                // mapElement={<div style={{ height: `100%` }} />}
            />
        </Modal>
    );
}

export default ModalMap;