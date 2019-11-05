import React, {Component} from "react";
import * as PropTypes from "prop-types";
import initialValue from "./value.json";
import {Value} from "slate";

/* First we will make a new context */
export const RTEContext = React.createContext();

/* Then create a provider Component */
class RTEContextProvider extends Component {
    /* State */
    constructor(props) {
        super(props);
        this.state = {
            value: Value.fromJSON(props.value || initialValue),
            title: props.title,
            modalVisible: false,
            colorPickerVisible: false,
            mapVisible: false,
            modalResolve: () => {
            },
            modalReject: () => {
            },
            gallerySelectedItem: null,
            editor: null,
            previewMode: false,
            isOpenLightbox: false,
            currentGalleryImage: null
        };
    }

    /* Actions */
    showModal = (type) => {
        this.setState({
            [type]: true
        });
        return new Promise((resolve, reject) => {
            this.setState({
                modalResolve: resolve,
                modalReject: reject
            });
        });
    };

    hideModal = (type) => {
        this.setState({
            [type]: false
        });
    };

    setGallerySelectedItem = (gallerySelectedItem) => {
        this.setState({gallerySelectedItem});
    };

    setEditorInstance = (editor) => {
        this.setState({editor});
    };

    setEditorValue = (value) => {
        this.setState({value});
    };

    setPreviewMode = (previewMode) => {
        this.setState({previewMode});
    };

    setTitle = (title) => {
        this.setState({title});
    };

    /* Gallary Action */
    openLightbox = (image) => {
        console.log("is light box click", image);
        this.setState({
            isOpenLightbox: true,
            currentGalleryImage: image
        })
    };

    closeLightbox = () => {
        this.setState({
            isOpenLightbox: false
        })
    };

    render() {
        return (
            <RTEContext.Provider
                value={{
                    value: this.state.value,
                    editor: this.state.editor,
                    modalVisible: this.state.modalVisible,
                    colorPickerVisible: this.state.colorPickerVisible,
                    mapVisible: this.state.mapVisible,
                    gallerySelectedItem: this.state.gallerySelectedItem,
                    modalResolve: this.state.modalResolve,
                    modalReject: this.state.modalReject,
                    previewMode: this.state.previewMode,
                    title: this.state.title,
                    setTitle: this.setTitle,
                    setEditorValue: this.setEditorValue,
                    setPreviewMode: this.setPreviewMode,
                    showModal: this.showModal,
                    hideModal: this.hideModal,
                    setEditorInstance: this.setEditorInstance,
                    setGallerySelectedItem: this.setGallerySelectedItem,
                    isOpenLightbox: this.state.isOpenLightbox,
                    openLightbox: this.openLightbox,
                    closeLightbox: this.closeLightbox
                }}
            >
                {this.props.children}
            </RTEContext.Provider>
        );
    }
}

RTEContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default RTEContextProvider;
