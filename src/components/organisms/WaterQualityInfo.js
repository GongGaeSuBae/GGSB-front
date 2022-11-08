import { H1, H2, H4, Span, Good, Bad } from "../atoms";
import { ColFlex, ColFlexCenter } from "../molecules";

import { Table, Form } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import Chart from "chart.js/auto"
import { Line } from "react-chartjs-2";

const WaterQualityMainInfo = ({city, district, phVal, tbVal, clVal}) => {
    return (<ColFlexCenter id="WaterQualityMainInfo">
        <H1>경상북도 {city} {district}</H1>
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
        <H2>▶ 관찰 주기 선택</H2>
        <Form>
            <div key="daterange"></div>
            <H4>
                <Form.Check 
                inline
                defaultChecked
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

const WaterQualityGraph = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        elements: {
            point: {
                radius: 0,
            }
        },
        responsive: true,
        interaction: {
            mode: 'index',
            interaction: false,
        },
        stacked: false,
        scales: {
            ph: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    min: 5,
                    max: 9,
                    stepSize: 0.1
                },
                scaleLabel: {
                    display: true,
                    labelString: 'pH'
                }
            },
            tb_cl : {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false
                },
                ticks: {
                    min: 0,
                    max: 1,
                    stepSize: 0.2
                },
                scaleLabel: {
                    display: true,
                    labelString: '탁도/잔류염소'
                }
            }, 
            x: {
                ticks: {
                    callback: function(val, index) {
                        return index%3 === 0 ? this.getLabelForValue(val): ''
                    }
                }
            }   
        }
    };
    const waterQualityData = {
        labels: ["00", "01", "02", "03", "04", "05", 
        "06", "07", "08", "09", "10", "11",
        "12", "13", "14", "15", "16", "17", 
        "18", "19", "20", "21", "22", "23"],
        datasets: [
            {
                label: "pH",
                data: [7.6455, 7.6391, 7.6383, 7.6440, 7.6455, 7.4356, 
                    7.6455, 7.6391, 7.6383, 7.6440, 7.6455, 7.4356],
                fill: false,
                borderColor: "rgba(242, 114, 140, 1)",
                yAxisID: 'ph',
            },
            {
                label: "탁도",
                data: [0.0525, 0.0532, 0.0536, 0.0528, 0.0524],
                fill: false,
                borderColor: "rgba(255, 212, 0, 1)",
                yAxisID: 'tb_cl'
            },
            {
                label: "잔류염소",
                data: [0.9707, 0.9111, 0.8970, 0.9397, 0.9662],
                fill: false,
                borderColor: "rgba(39, 170, 225, 1)",
                yAxisID: 'tb_cl'
            }
        ]
    }

    return (<ColFlex id="WaterQualityGraphWrapper">
        <Line data={waterQualityData} options={options}/>
    </ColFlex>)
}

export { WaterQualityMainInfo, WaterQualityStandard, WaterPurificationInfo,
     WaterQualityGraphSearchHanlder, WaterQualityGraph }