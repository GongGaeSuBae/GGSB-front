import { H1, H2, H4, Span, Good, Bad } from "../atoms";
import { ColFlex, ColFlexCenter } from "../molecules";

import { Table, Form } from "react-bootstrap";

const WaterQualityMainInfo = (props) => {
    return (<ColFlexCenter id="WaterQualityMainInfo">
        <H1>경상북도 구미시 거의동</H1><Good/>
        <Table bordered>
            <thead>
                <th width="33%">pH</th>
                <th width="33%">탁도</th>
                <th width="33%">잔류염소</th>
            </thead>
            <tbody>
                <tr>
                    <td>5.9</td>
                    <td>0.01</td>
                    <td>0.63</td>
                </tr>
                <tr>
                    <td><Span id="Good">적합</Span></td>
                    <td><Span id="Good">적합</Span></td>
                    <td><Span id="Good">적합</Span></td>
                </tr>
            </tbody>
        </Table>
    </ColFlexCenter>)
}

const WaterQualityStandard = () => {
    return (<ColFlex id="WaterQualityStandard">
        <H2 className="WQSTitle">수질 적합 기준</H2>
        <ColFlex id="WQSValueWrapper">
            <H4 className="WQSValue">pH: 5.8~8.5 사이</H4>
            <H4 className="WQSValue">탁도: 0.5NTU 이하</H4>
            <H4 className="WQSValue">잔류염소: 4mg/L 이하</H4>
        </ColFlex>
    </ColFlex>)
}

const WaterPurificationInfo = () => {
    return (
        <ColFlexCenter id="WaterPurificationInfo">
            <H2><Span id="Region">경상북도 구미시 거의동</Span>은</H2>
            <H2><Span id="WaterPurification">구미정수장</Span>의 물을 사용해요</H2>
        </ColFlexCenter>
    )
}

const WaterQualityGraphSearchHanlder = () => {
    return (<ColFlex id="WaterQualityGraphSearchHanlder">
        <H4>▶ 관찰 주기 선택</H4>
        <Form>
            <div key="daterange"></div>
            <H4>
                <Form.Check 
                inline
                id="daterange-0"
                className="CustomChk"
                type="radio"
                name="RangeSearch"
                value={0} 
                label="일간" />
                <Form.Check 
                inline
                id="daterange-1"
                className="CustomChk"
                type="radio"
                name="RangeSearch"
                value={1}
                label="주간" />
                <Form.Check 
                inline
                id="daterange-2"
                className="CustomChk"
                type="radio"
                name="RangeSearch"
                value={2}
                label="월간" />
            </H4>
        </Form>
    </ColFlex>
    )
}

export { WaterQualityMainInfo, WaterQualityStandard, WaterPurificationInfo, WaterQualityGraphSearchHanlder }