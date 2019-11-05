import React, { useState, useContext } from 'react';
import { SketchPicker } from 'react-color';
import ModalType from '../core/ModalType';
import { Modal } from 'antd';
import { RTEContext } from '../RTEContextProvider';

const ColorPicker = () => {

    const context = useContext(RTEContext);

    const [color, setColor] = useState("#000000");

    const handleChangeComplete = (color) => {
        setColor(color);
    };

    const handleOk = () => {
        context.modalResolve(color)
        context.hideModal(ModalType.COLOR_PICKER);
    };

    const handleCancel = () => {
        context.modalReject(new Error("Canceled."));
        context.hideModal(ModalType.COLOR_PICKER);
    };

    return (
        <Modal
            title={"Color Picker"}
            visible={context.colorPickerVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            width="230px"
            bodyStyle={{ padding: "5px" }}
        >
            <SketchPicker
                color={color}
                onChangeComplete={handleChangeComplete}
            />
        </Modal>
    );

}

export default ColorPicker;