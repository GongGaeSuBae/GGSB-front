import { makeDailyDateStrArr, makeWeeklyDateStrArr, makeMonthlyDateStrArr,
    makeWeeklyAllDateStrArr, makeMonthlyAllDateStrArr} from './Date';

const initOptions = {
    elements: {
        point: { radius: 0, }
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    scales: {
        ph: {
            scaleLabel: { 
                display: true, 
                labelString: 'pH' 
            },
            type: 'linear',
            display: true,
            position: 'left',
            ticks: { min: 5, max: 9, stepSize: 0.1 },
            grid: { drawOnChartArea: false },
            title: {
                display: true,
                align: 'end',
                color: '#808080',
                font: {
                  size: 12,
                  family: "'Noto Sans KR', sans-serif",
                  weight: 500,
                },
                text: 'pH(pH)'
              },

        },
        tb_cl : {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: { min: 0, max: 1, stepSize: 0.2 },
            title: {
                display: true,
                align: 'end',
                color: '#808080',
                font: {
                  size: 12,
                  family: "'Noto Sans KR', sans-serif",
                  weight: 500,
                },
                text: '탁도(NTU), 잔류염소(mg/L)'
              },
        },  
    }
};

export const dailyOptions = {...initOptions, 
    scales: {...initOptions.scales, 
        x: {
            ticks: {
                callback: function(val, index) {
                    return index%3 === 0 ? this.getLabelForValue(val): ''
                }
            }
        }
    }
}

export const weeklyOptions = {...initOptions, }

export const weeklyBarOptions = {...initOptions, scales: {
    ...initOptions.scales,
    ph: {
        ...initOptions.scales.ph,
        beginAtZero: false,
        ticks: { min: 5, max: 9, stepSize: 0.2 },
    }
}}

export const monthlyOptions = {...initOptions, scales: {...initOptions.scales, 
    x: {
        ticks: {
            callback: function(val, index) {
                return index%2 === 0 ? this.getLabelForValue(val): ''
            }
        }
    }
}}

export const monthlyBarOptions = {...initOptions, scales: {
    ...initOptions.scales,
    ph: {
        ...initOptions.scales.ph,
        beginAtZero: false,
        ticks: { min: 5, max: 9, stepSize: 0.2 },
    }
}}

export const initData = {
    labels: [],
    datasets: [
        {
            label: "pH",
            fill: false,
            borderColor: "rgba(242, 114, 140, 1)",
            yAxisID: 'ph',
        },
        {
            label: "탁도",
            fill: false,
            borderColor: "rgba(255, 212, 0, 1)",
            yAxisID: 'tb_cl'
        },
        {
            label: "잔류염소",
            fill: false,
            borderColor: "rgba(39, 170, 225, 1)",
            yAxisID: 'tb_cl'
        }
    ]
}

export const initBarData = {
    labels: [],
    datasets: [
        {
            label: "pH",
            fill: false,
            backgroundColor: "rgba(242, 114, 140, 1)",
            yAxisID: 'ph',
        },
        {
            label: "탁도",
            fill: false,
            backgroundColor: "rgba(255, 212, 0, 1)",
            yAxisID: 'tb_cl'
        },
        {
            label: "잔류염소",
            fill: false,
            backgroundColor: "rgba(39, 170, 225, 1)",
            yAxisID: 'tb_cl'
        }
    ]
}

export const preprocessingRealtimeDataDaily = (rawData) => {
    let phVals = []; let tbVals = []; let clVals = []; let dates = [];
    let dailyStrArr = makeDailyDateStrArr();
    const pushData = (timeStr, i) => {
        if(rawData.dates !== undefined) {
            var idx = rawData.dates.indexOf(`${timeStr}`);
            if(idx === -1) {
                dates.push(null)
                phVals.push(null); 
                tbVals.push(null); 
                clVals.push(null); 
            } else {    
                dates.push(rawData.dates[idx])
                phVals.push(rawData.phvals[idx] === 0 ? null : rawData.phvals[idx]); 
                tbVals.push(rawData.tbVals[idx] === 0 ? null : rawData.tbVals[idx]); 
                clVals.push(rawData.clVals[idx] === 0 ? null : rawData.clVals[idx]); 
            }
        }
    }

    for(var j = 0; j < dailyStrArr.length; j++) {
        pushData(dailyStrArr[j]);
    }

    return { phVals, tbVals, clVals, dates }
}

export const preprocessingRealtimeDataWeekly = (rawData) => {
    let phVals = []; let tbVals = []; let clVals = []; let dates = [];
    let weekStrArr = makeWeeklyDateStrArr();

    const pushData = (timeStr, i) => {
        if(rawData.dates !== undefined) {
            var idx = rawData.dates.indexOf(`${timeStr}`);
            if(idx === -1) {
                dates.push(null)
                phVals.push(null); 
                tbVals.push(null); 
                clVals.push(null); 
            } else {    
                dates.push(rawData.dates[idx])
                phVals.push(rawData.phvals[idx] === 0 ? null : rawData.phvals[idx]); 
                tbVals.push(rawData.tbVals[idx] === 0 ? null : rawData.tbVals[idx]); 
                clVals.push(rawData.clVals[idx] === 0 ? null : rawData.clVals[idx]); 
            }
        }
    }

    for(var j = 0; j < weekStrArr.length; j++) {
        pushData(weekStrArr[j]);
    }

    return { phVals, tbVals, clVals, dates }
}

export const preprocessingRealtimeDataMonthly = (rawData) => {
    let phVals = []; let tbVals = []; let clVals = []; let dates = [];
    let monthlyStrArr = makeMonthlyDateStrArr();

    const pushData = (timeStr, i) => {
        if(rawData.dates !== undefined) {
            var idx = rawData.dates.indexOf(`${timeStr}`);
            if(idx === -1) {
                dates.push(null)
                phVals.push(null); 
                tbVals.push(null); 
                clVals.push(null); 
            } else {    
                dates.push(rawData.dates[idx])
                phVals.push(rawData.phvals[idx] === 0 ? null : rawData.phvals[idx]); 
                tbVals.push(rawData.tbVals[idx] === 0 ? null : rawData.tbVals[idx]); 
                clVals.push(rawData.clVals[idx] === 0 ? null : rawData.clVals[idx]); 
            }
        }
    }

    for(var j = 0; j < monthlyStrArr.length; j++) {
        pushData(monthlyStrArr[j]);
    }

    return { phVals, tbVals, clVals, dates }
}

export const preprocessingRealtimeDataWeeklyAvg = (rawData) => {
    const avgDates = makeWeeklyAllDateStrArr();
    let phAvgVals = []; let tbAvgVals = []; let clAvgVals = [];
    var phSum=0, tbSum=0, clSum=0, hours=24;

    const pushData = (timeStr) => {
        if(rawData.dates !== undefined) {
            var idx = rawData.dates.indexOf(`${timeStr}`);
            if(idx === -1) {
                hours--; 
            } else {    
                phSum += rawData.phvals[idx];
                tbSum += rawData.tbVals[idx];
                clSum += rawData.clVals[idx];
                if(rawData.phvals[idx] === 0 && rawData.tbVals[idx] === 0 && rawData.clVals[idx] === 0)
                    hours--;
            }

            if(Number(timeStr) % 100 === 23) {
                phAvgVals.push(phSum / hours);
                tbAvgVals.push(tbSum / hours);
                clAvgVals.push(clSum / hours);
                phSum = 0; tbSum = 0; clSum = 0; hours=24;
            }
        }
    }

    for(var i=0; i < avgDates.length; i++) 
        pushData(avgDates[i]);

    return { phAvgVals, tbAvgVals, clAvgVals }
}

export const preprocessingRealtimeDataMonthlyAvg = (rawData) => {
    const avgDates = makeMonthlyAllDateStrArr();
    let phAvgVals = []; let tbAvgVals = []; let clAvgVals = [];
    var phSum=0, tbSum=0, clSum=0, weekOfDays=1, hours=168;

    const pushData = (timeStr) => {
        if(rawData.dates !== undefined) {
            var idx = rawData.dates.indexOf(`${timeStr}`);
            if(idx === -1) {
                hours--; 
            } else {    
                phSum += rawData.phvals[idx];
                tbSum += rawData.tbVals[idx];
                clSum += rawData.clVals[idx];
                if(rawData.phvals[idx] === 0 && rawData.tbVals[idx] === 0 && rawData.clVals[idx] === 0)
                    hours--;
            }

            if(Number(timeStr) % 100 === 23) {
                if(weekOfDays === 7) {
                    phAvgVals.push(phSum / hours);
                    tbAvgVals.push(tbSum / hours);
                    clAvgVals.push(clSum / hours);
                    phSum = 0; tbSum = 0; clSum = 0; hours=168; weekOfDays=1;
                } else {   
                    weekOfDays++;
                }
            } 
            
        }
    }

    for(var i=0; i < avgDates.length; i++) {
        pushData(avgDates[i]);
    }

    return { phAvgVals, tbAvgVals, clAvgVals }
}

export const preprocessingDailyDataMonthlyAvg = (rawData) => {
    let phAvgVals = []; let tbAvgVals = []; let clAvgVals = [];
    if(rawData.dates !== undefined) {
        var phtmp = 0, tbtmp = 0, cltmp = 0;
        for(var i=0; i < rawData.dates.length; i++) {
            phtmp += rawData.phvals[i];
            tbtmp += rawData.tbVals[i];
            cltmp += rawData.clVals[i];
            if(i%7 === 6) {
                phAvgVals.push(phtmp/7); 
                tbAvgVals.push(tbtmp/7); 
                clAvgVals.push(cltmp/7); 
                phtmp = 0; tbtmp = 0; cltmp = 0;
            }
        }
    }
    return { phAvgVals, tbAvgVals, clAvgVals }
}


