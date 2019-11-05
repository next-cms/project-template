import { Button } from "antd";
import React from "react";
import ModalType from "../ModalType";
import { MdFormatColorText } from "react-icons/md";


/* Inline  */

const hasColors = (type, value) => {
    return value.inlines.filter(inline => inline.type === type);
}

const onClickColor = (event, type, { value, editor, showModal }) => {

    event.preventDefault();

    showModal(ModalType.COLOR_PICKER).then((color) => {
        editor.addColor(color.hex);
    }).catch(e => console.log(e.message));

}

export const renderColorButton = (type, { value, editor, showModal }) => {

    const hasColor = hasColors(type, value);

    return (
        <Button
            style={{ 
                fontSize: "24px", 
                boxShadow: "0px 0px 10px #888888"
            }}
            shape="circle"
            type="default"
            onMouseDown={event => onClickColor(event, type, { value, editor, showModal })}
        >
            <MdFormatColorText style={{
                color:  hasColor.get(0) ? hasColor.get(0).data.get('color') : '',
            }} />
        </Button>
    );
};

/*  Inlne End */