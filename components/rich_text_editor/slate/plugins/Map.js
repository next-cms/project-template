const Map = {
    commands: {
        insertMap: (editor, map) => {
            editor.insertBlock({
                type: "map",
                data: {map}
            })
        }
    }
}

export default Map;