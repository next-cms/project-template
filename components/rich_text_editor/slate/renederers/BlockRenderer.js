import React from "react";
import ImageComponent from "../components/ImageComponent";
import { Paragraph, Table, TableCell, TableRow } from "../SlateComponet";
import BlockAlignment from "../components/BlockAlignment";
import BlockQuote from "../components/BlockQuote";
import { Row, Col, Divider } from "antd";
import MapComponent from "../components/map-comonent/MapComponent";

const renderBlock = (props, editor, next) => {

    const { attributes, children, node } = props;

    switch (node.type) {
        case "block-quote":
            return <BlockQuote {...props}>{children}</BlockQuote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        case "row":
            return <Row gutter={8} {...attributes}>{children}</Row>;
        case "col":
            return <Col xs={12} {...attributes}>{children}</Col>;
        case "divider-with-text":
            return <Divider {...attributes}>{children}</Divider>;
        case "divider":
            return <Divider {...attributes} />;
        case "image": {
            return <ImageComponent image={node.data.get("image")} editor={editor} {...props} />;
        }
        case "map": {
            return <MapComponent {...attributes} lat={node.data.get("map").lat} lng={node.data.get("map").lng} {...props} />;
        }
        case "align": {
            return <BlockAlignment align={node.data.get("alignType")} type={node.data.get("type")} {...props}>{children}</BlockAlignment>;
        }
        case "table":
            return <Table {...props} />;
        case "table_row":
            return <TableRow {...props} />;
        case "table_cell":
            return <TableCell {...props} />;
        case "paragraph":
            return <Paragraph {...props} />;
        default:
            return next();
    }
};

export default renderBlock;
