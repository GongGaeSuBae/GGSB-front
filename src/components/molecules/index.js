import { Row, Col } from 'react-bootstrap';

const RowWrapper = (props) => {
    return (<Row id={props.id} className={props.className}>{props.children}</Row>);
}

const ColWrapper = (props) => {
    return (<Col id={props.id} className={props.className}>{props.children}</Col>);
}

const RowFlex = (props) => {
    return (<div id={props.id} className="RowFlex">{props.children}</div>);
}

const ColFlex = (props) => {
    return (<div id={props.id} className="ColFlex">{props.children}</div>);
}

const RowFlexCenter = (props) => {
    return (<div id={props.id} className="RowFlexCenter">{props.children}</div>);
}

const ColFlexCenter = (props) => {
    return (<div id={props.id} className="ColFlexCenter">{props.children}</div>);
}

export { RowWrapper, ColWrapper, RowFlex, ColFlex, RowFlexCenter, ColFlexCenter }