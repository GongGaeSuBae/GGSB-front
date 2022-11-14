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

export const monthlyOptions = {...initOptions, scales: {...initOptions.scales, 
    x: {
        ticks: {
            callback: function(val, index) {
                return index%2 === 0 ? this.getLabelForValue(val): ''
            }
        }
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

export const preprocessingRealtimeDataWeelky = (rawData) => {
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