import { getTodayParameter } from './Date';

const initOptions = {
    elements: {
        point: { radius: 0, }
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
            ticks: { min: 5, max: 9, stepSize: 0.1 },
            scaleLabel: { display: true, labelString: 'pH' }
        },
        tb_cl : {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { min: 0, max: 1, stepSize: 0.2 },
            scaleLabel: { display: true, labelString: '탁도/잔류염소' }
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

export const preprocessingRealtimeDataWeekly = (rawData) => {
    let phVals = []; let tbVals = []; let clVals = []; let dates = [];
    if(rawData.dates !== undefined) {
        for(var i=24; i < rawData.dates.length; i++) {
            if(rawData.dates[i] % 100 === 24 || rawData.dates[i] % 100 === 6 
                || rawData.dates[i] % 100 === 12 || rawData.dates[i] % 100 === 18) { 
                    dates.push(rawData.dates[i]);
                    phVals.push(rawData.phvals[i]); 
                    tbVals.push(rawData.tbVals[i]); 
                    clVals.push(rawData.clVals[i]); 
                }
        }
    }
    return { phVals, tbVals, clVals, dates }
}

export const preprocessingRealtimeDataMonthly = (rawData) => {
    let phVals = []; let tbVals = []; let clVals = []; let dates = [];
    if(rawData.dates !== undefined) {
        for(var i=24; i < rawData.dates.length; i++) {
            if(rawData.dates[i] % 100 === 24) { 
                    dates.push(rawData.dates[i]);
                    phVals.push(rawData.phvals[i]); 
                    tbVals.push(rawData.tbVals[i]); 
                    clVals.push(rawData.clVals[i]); 
                }
        }
    }
    return { phVals, tbVals, clVals, dates }
}

export const preprocessingRealtimeDataWeeklyAvg = (rawData) => {
    let phAvgVals = []; let tbAvgVals = []; let clAvgVals = [];
    const { hourParam } = getTodayParameter();
    if(rawData.dates !== undefined) {
        var phtmp = 0, tbtmp = 0, cltmp = 0;
        for(var i=24; i < rawData.dates.length; i++) {
            if(rawData.dates[i] % 100 !== 23) { 
                   phtmp += rawData.phvals[i];
                   tbtmp += rawData.tbVals[i];
                   cltmp += rawData.clVals[i];
                } else {
                    phAvgVals.push(phtmp / 24);
                    tbAvgVals.push(tbtmp / 24);
                    clAvgVals.push(cltmp / 24);
                    phtmp = 0; tbtmp = 0; cltmp = 0;
                }
        }
        if (hourParam !== 24) {  
            phAvgVals.push(phtmp/(Number(hourParam)+1));
            tbAvgVals.push(tbtmp/(Number(hourParam)+1));
            clAvgVals.push(cltmp/(Number(hourParam)+1));
        }
    }
    return { phAvgVals, tbAvgVals, clAvgVals }
}

export const preprocessingRealtimeDataMonthlyAvg = (rawData) => {
    let phAvgVals = []; let tbAvgVals = []; let clAvgVals = [];
    if(rawData.dates !== undefined) {
        var phtmp = 0, tbtmp = 0, cltmp = 0, weekOfDays=1;
        for(var i=24; i < rawData.dates.length; i++) {
            if(rawData.dates[i] % 100 !== 23) { 
                   phtmp += rawData.phvals[i];
                   tbtmp += rawData.tbVals[i];
                   cltmp += rawData.clVals[i];
                } else {
                    weekOfDays++;
                    if(weekOfDays === 7) {
                        phAvgVals.push(phtmp/168); 
                        tbAvgVals.push(tbtmp/168); 
                        clAvgVals.push(cltmp/168); 
                        phtmp = 0; tbtmp = 0; cltmp = 0; weekOfDays=1;
                    }
                }
        }
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


