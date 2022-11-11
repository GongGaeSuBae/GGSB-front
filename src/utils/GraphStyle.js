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