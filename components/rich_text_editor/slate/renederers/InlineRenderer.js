import React from "react";

const renderInline = (props, editor, next) => {

    const { attributes, children, node } = props;

    switch (node.type) {
        case "link":
            return (<a {...attributes} href={node.data.get('href')}>{children}</a>);
        case "color":
            return <span style={{ color: node.data.get('color') }}>{children}</span>;
    }

};

export default renderInline;
