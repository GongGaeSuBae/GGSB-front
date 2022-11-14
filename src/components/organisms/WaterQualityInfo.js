import { H1, H2, H4, H5, Span, Good, Bad, Setting } from "../atoms";
import { ColFlex, ColFlexCenter } from "../molecules";

import { Table, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../redux/Action";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

import { useWaterQualityGraphData } from "../../hooks";
import { makeWeeklyDateArr, makeMonthlyDateArr, weeklyGraphXAxis } from "../../utils/Date";
import { dailyOptions, weeklyOptions, monthlyOptions, initData, 
    preprocessingRealtimeDataWeelky, preprocessingRealtimeDataMonthly } from "../../utils/GraphStyle";

const WaterQualityMainInfo = ({city, district, phVal, tbVal, clVal, type}) => {
    return (<ColFlexCenter id="WaterQualityMainInfo">
        <H1>경상북도 {city} {district}</H1>
        {type === 2 || phVal === 0 || tbVal === 0 || clVal === 0
        ? <>
            <Setting />
            <H2>점검중 입니다.</H2>
        </>    
        :<>
        {(phVal>=5.8 & phVal<=8.5) && (tbVal<=0.5) && (clVal<=4) 
        ? <><Good/></> : <><Bad /></>}
        <Table bordered>
            <thead>
                <th width="33%">pH</th>
                <th width="33%">탁도</th>
                <th width="33%">잔류염소</th>
            </thead>
            <tbody>
                <tr>
                    <td>{phVal.toFixed(2)}</td>
                    <td>{tbVal.toFixed(3)}</td>
                    <td>{clVal.toFixed(3)}</td>
                </tr>
                <tr>
                    <td><Span id={phVal>=5.8 & phVal<=8.5 ? "Good" : "Bad"}>{phVal>5.8 & phVal<8.5 ? <>적합</> : <>부적합</>}</Span></td>
                    <td><Span id={tbVal<=0.5 ? "Good" : "Bad"}>{tbVal<=0.5 ? <>적합</> : <>부적합</>}</Span></td>
                    <td><Span id={clVal<=4 ? "Good" : "Bad"}>{clVal<=4  ? <>적합</> : <>부적합</>}</Span></td>
                </tr>
            </tbody>
        </Table>
        </>
        }
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

const WaterPurificationInfo = ({city, district, wpname}) => {
    return (
        <ColFlexCenter id="WaterPurificationInfo">
            <H2><Span id="Region">경상북도 {city} {district}</Span>은</H2>
            <H2><Span id="WaterPurification">{wpname}</Span>의 물을 사용해요</H2>
        </ColFlexCenter>
    )
}

const WaterQualityGraphSearchHanlder = ({wpType}) => {
    const dispatch = useDispatch();
    const graphOpt = useSelector((state) => state.graphOption);
    if (wpType === 1 && graphOpt === '0')
        dispatch(Action.selectGraphOption('1'));

    return (<ColFlex id="WaterQualityGraphSearchHanlder">
        <H4>▶ 관찰 주기 선택</H4>
        <Form onChange={(e) => dispatch(Action.selectGraphOption(e.target.value))}>
            <div key="daterange"></div>
            <H5>
                { wpType === 0
                ? <Form.Check inline defaultChecked={graphOpt === '0' ? true : false}
                id="daterange-0" className="CustomChk" type="radio"
                name="RangeSearch" value={0} label="일간" />
                : <></>}
                <Form.Check inline defaultChecked={graphOpt === '1' ? true : false}
                id="daterange-1" className="CustomChk" type="radio"
                name="RangeSearch" value={1} label="주간" />
                <Form.Check inline defaultChecked={graphOpt === '2' ? true : false}
                id="daterange-2" className="CustomChk" type="radio"
                name="RangeSearch" value={2} label="월간" />
            </H5>
        </Form>
        {graphOpt === '0' ? <><WaterQualityDailyGraph /></>
        : graphOpt === '1' ? <><WaterQualityWeeklyGraph wpType={wpType}/></>
        : graphOpt === '2' ? <><WaterQualityMonthlyGraph wpType={wpType}/></> :<></>
        }
    </ColFlex>
    )
}


const WaterQualityDailyGraph = () => {
    ChartJS.register(CategoryScale, LinearScale, PointElement,
        LineElement, Title, Tooltip, Legend);

    const state = useSelector((state) => state.searchArea);
    const { waterQualityGraphData } = useWaterQualityGraphData(state.city, state.district, 0);
    
    const waterQualityDaliyData = {...initData,
        labels: ["00", "01", "02", "03", "04", "05", 
        "06", "07", "08", "09", "10", "11",
        "12", "13", "14", "15", "16", "17", 
        "18", "19", "20", "21", "22", "23"],
        datasets: [{...initData.datasets[0], data: waterQualityGraphData.phvals}, 
        {...initData.datasets[1], data: waterQualityGraphData.tbVals}, 
        {...initData.datasets[2], data: waterQualityGraphData.clVals}]
    }
    return (<ColFlex id="WaterQualityGraphWrapper">
        <Line data={waterQualityDaliyData} options={dailyOptions}/>
    </ColFlex>)
}

const WaterQualityWeeklyGraph = ({wpType}) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement,
        LineElement, Title, Tooltip, Legend);

    const state = useSelector((state) => state.searchArea);
    const { waterQualityGraphData } = useWaterQualityGraphData(state.city, state.district, 1);

    let waterQualityWeeklyLineData = null;

    if(wpType === 1) {
        waterQualityWeeklyLineData = {...initData,
            labels: makeWeeklyDateArr(),
            datasets: [{...initData.datasets[0], data: waterQualityGraphData.phvals}, 
            {...initData.datasets[1], data: waterQualityGraphData.tbVals}, 
            {...initData.datasets[2], data: waterQualityGraphData.clVals}]
        }
    } else {
        let { phVals, tbVals, clVals, dates } = preprocessingRealtimeDataWeelky(waterQualityGraphData);    
        waterQualityWeeklyLineData = {
            ...initData,
            labels: weeklyGraphXAxis(),
            datasets: [{...initData.datasets[0], data: phVals}, 
            {...initData.datasets[1], data: tbVals}, 
            {...initData.datasets[2], data: clVals}]
        }
    }

    return (<ColFlex id="WaterQualityGraphWrapper">
        <Line data={waterQualityWeeklyLineData} options={weeklyOptions}/>
    </ColFlex>)
}

const WaterQualityMonthlyGraph = ({wpType}) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement,
        LineElement, Title, Tooltip, Legend);

    const state = useSelector((state) => state.searchArea);
    const { waterQualityGraphData } = useWaterQualityGraphData(state.city, state.district, 2);

    let waterQualityMonthlyLineData = null;

    if(wpType === 1) {
        waterQualityMonthlyLineData = {...initData,
            labels: makeMonthlyDateArr(),
            datasets: [{...initData.datasets[0], data: waterQualityGraphData.phvals}, 
            {...initData.datasets[1], data: waterQualityGraphData.tbVals}, 
            {...initData.datasets[2], data: waterQualityGraphData.clVals}]
        }
    } else {
        let { phVals, tbVals, clVals, dates } = preprocessingRealtimeDataMonthly(waterQualityGraphData);
        console.log(dates);
        waterQualityMonthlyLineData = {
            ...initData,
            labels: makeMonthlyDateArr(),
            datasets: [{...initData.datasets[0], data: phVals}, 
            {...initData.datasets[1], data: tbVals}, 
            {...initData.datasets[2], data: clVals}]
        }
    }

    return (<ColFlex id="WaterQualityGraphWrapper">
        <Line data={waterQualityMonthlyLineData} options={monthlyOptions}/>
    </ColFlex>)
}

export { WaterQualityMainInfo, WaterQualityStandard, WaterPurificationInfo,
     WaterQualityGraphSearchHanlder }