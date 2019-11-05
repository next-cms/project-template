import React, { useState, useContext, useEffect, Fragment } from 'react';
import Carousel, { Modal, ModalGateway } from "react-images";
import { RTEContext } from '../RTEContextProvider';

const ImageViewer = () => {

    const rteContext = useContext(RTEContext);

    const [images, setImages] = useState([
        { src: "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }
    ]);

    useEffect(() => {

        console.log("image viewer effect", rteContext.isOpenLightbox)

        if (rteContext.isOpenLightbox == true) {
            setImages(findAllImage(rteContext.value.toJSON()))
        }

    }, [rteContext.isOpenLightbox]);

    const findAllImage = (values) => {
        console.log(values);
        let images = [];
        iterateNodes(values.document.nodes, images);
        return images;
    }

    const iterateNodes = (nodes, images) => {
        nodes.forEach(element => {
            if (element.type === "image") {
                images.push(element.data.image);
            }
            if (element.nodes) iterateNodes(element.nodes, images);
        });
    }


    return (
        <Fragment>
            <ModalGateway>
                {rteContext.isOpenLightbox ? (
                    <Modal onClose={() => rteContext.closeLightbox()}>
                        <Carousel
                            // currentIndex={currentImage}
                            views={images}
                        // views={images.map(photo => ({
                        //     src: photo.src,
                        //     caption: photo.id
                        // }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
            <style jsx global>
                {`
                    .css-yrspe {
                        z-index: 1001 !important;
                    }

                    .css-1rbq2qy {
                        z-index: 1001 !important;
                    }
                `}
            </style>
        </Fragment>
    );
}

export default ImageViewer;