const Color = {
    commands: {
        addColor: (editor, color) => {
            editor.unwrapInline().wrapInline({
                type: "color",
                data: {color}
            });

        }
    }
}

export default Color;