import uuidv4 from 'uuid/v4';

const Image = {
    commands: {
        insertImage: (editor, src, target) => {
            editor.insertBlock({
                type: "image",
                data: {
                    image: {
                        src,
                        key: uuidv4()
                    }
                }
            });
        }
    }
};

export default Image;
