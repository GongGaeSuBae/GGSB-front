import { Button, Form } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

const P = (props) => {
    return <p id={props.id} className="CustomPTag">{props.children}</p>
}

const Span = (props) => {
    return <span id={props.id} className="CustomSpanTag">{props.children}</span>
}

const H1 = (props) => {
    return <h1 id={props.id} className="CustomH1Tag">{props.children}</h1>
}

const H2 = (props) => {
    return <h2 id={props.id} className="CustomH2Tag">{props.children}</h2>
}

const H3 = (props) => {
    return <h3 id={props.id} className="CustomH3Tag">{props.children}</h3>
}

const H4 = (props) => {
    return <h4 id={props.id} className="CustomH4Tag">{props.children}</h4>
}

const H5 = (props) => {
    return <h5 id={props.id} className="CustomH5Tag">{props.children}</h5>
}

const SearchBtn = (props) => {
    return <Button className="SearchBtn" variant="primary" onClick={props.eventHandler}><BiSearch /></Button>
}

const SelectBox = (props) => {
    return <Form.Control as="select" size="lg" id={props.id} name={props.name} onChange={props.eventHandler} value={props.value}>
        <option value="">{props.label}</option>
        {props.items.map((item) => <option value={item.value}>{item.name}</option>)}
    </Form.Control>
}

const Radio = (props) => {
    return (<Form.Check
        inline
        label={props.label}
        type="radio"
        id={props.id}/>);
}

const Good = (props) => {
    return(<div className="Good" id={props.id}></div>);
}

const Bad = (props) => {
    return(<div className="Bad" id={props.id}></div>);
}

const Setting = (props) => {
    return(<div className="Setting" id={props.id}></div>);
}

const LoadingCharacter = () => {
    return(<div className="LoadingCharacter">
        <div className="MulBangul"></div>
        <div className="LoadingBar"></div>
    </div>)
}

export { P, Span, H1, H2, H3, H4, H5, SearchBtn, SelectBox, Radio, Good, Bad, Setting, LoadingCharacter };