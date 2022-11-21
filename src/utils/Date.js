export const makeDailyDateStrArr = () => {
    const dailyArr = [];
    var now = new Date();
    var yesterday = new Date(now.getTime());
    yesterday.setDate(yesterday.getDate()-1);
    var yesterdate = `${yesterday.getFullYear()}${('0'+(yesterday.getMonth()+1)).slice(-2)}${('0'+(yesterday.getDate())).slice(-2)}`;
    dailyArr.push(`${yesterdate}24`);
    var date = `${now.getFullYear()}${('0'+(now.getMonth()+1)).slice(-2)}${('0'+(now.getDate())).slice(-2)}`;
    for(var i=1; i<=23; i++) 
        dailyArr.push(`${date}${('0' + i).slice(-2)}`);
    return dailyArr;
}

export const makeWeeklyDateArr = () => {
    const weeklyArr = [];
    var now = new Date();
    var oneWeekAgo = new Date(now.getTime());
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    while(oneWeekAgo <= now) {
        var date = '';
        var month = '0' + (oneWeekAgo.getMonth()+1);
        date += month.slice(-2);
        var day = '0'+oneWeekAgo.getDate();
        date += '/'+ day.slice(-2);
        oneWeekAgo.setDate(oneWeekAgo.getDate()+1);
        weeklyArr.push(date);
    }
    return weeklyArr;
};

export const makeWeeklyDateStrArr = () => {
    const weeklyArr = [];
    var now = new Date();
    var oneWeekAgo = new Date(now.getTime());
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    var oneWeekTmp = `${oneWeekAgo.getFullYear()}${('0'+(oneWeekAgo.getMonth()+1)).slice(-2)}${('0'+(oneWeekAgo.getDate())).slice(-2)}`;
    weeklyArr.push(`${oneWeekTmp}24`);
    oneWeekAgo.setDate(oneWeekAgo.getDate()+1);
    while(oneWeekAgo <= now) {
        var date = `${oneWeekAgo.getFullYear()}`;
        var month = '0' + (oneWeekAgo.getMonth()+1);
        date += month.slice(-2);
        var day = '0'+oneWeekAgo.getDate();
        date += day.slice(-2);
        weeklyArr.push(`${date}06`);
        weeklyArr.push(`${date}12`);
        weeklyArr.push(`${date}18`);
        weeklyArr.push(`${date}24`);
        oneWeekAgo.setDate(oneWeekAgo.getDate()+1);
    }
    return weeklyArr;
}

export const makeWeeklyAllDateStrArr = () => {
    const weeklyArr = [];
    var now = new Date();
    var oneWeekAgo = new Date(now.getTime());
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    var oneWeekTmp = `${oneWeekAgo.getFullYear()}${('0'+(oneWeekAgo.getMonth()+1)).slice(-2)}${('0'+(oneWeekAgo.getDate())).slice(-2)}`;
    weeklyArr.push(`${oneWeekTmp}24`);
    oneWeekAgo.setDate(oneWeekAgo.getDate()+1);
    while(oneWeekAgo <= now) {
        var date = `${oneWeekAgo.getFullYear()}`;
        var month = '0' + (oneWeekAgo.getMonth()+1);
        date += month.slice(-2);
        var day = '0'+oneWeekAgo.getDate();
        date += day.slice(-2);
        for(var i=1; i<=24; i++) 
            weeklyArr.push(`${date}${('0' + i).slice(-2)}`);
        oneWeekAgo.setDate(oneWeekAgo.getDate()+1);
    }
    return weeklyArr;
}

export const makeMonthlyAllDateStrArr = () => {
    const montlyArr = [];
    var now = new Date();
    var oneMonthAgo = new Date(now.getTime());
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 28);
    var oneMonthTmp = `${oneMonthAgo.getFullYear()}${('0'+(oneMonthAgo.getMonth()+1)).slice(-2)}${('0'+(oneMonthAgo.getDate())).slice(-2)}`;
    montlyArr.push(`${oneMonthTmp}24`);
    oneMonthAgo.setDate(oneMonthAgo.getDate()+1);
    while(oneMonthAgo <= now) {
        var date = `${oneMonthAgo.getFullYear()}`;
        var month = '0' + (oneMonthAgo.getMonth()+1);
        date += month.slice(-2);
        var day = '0'+oneMonthAgo.getDate();
        date += day.slice(-2);
        for(var i=1; i<=24; i++) 
        montlyArr.push(`${date}${('0' + i).slice(-2)}`);
        oneMonthAgo.setDate(oneMonthAgo.getDate()+1);
    }
    return montlyArr;
}


export const makeMonthlyDateArr = () => {
    const monthlyArr = [];
    var now = new Date();
    var oneMonthAgo = new Date(now.getTime());
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 27);
    while(oneMonthAgo <= now) {
        var date = '';
        var month = '0' + (oneMonthAgo.getMonth()+1);
        date += month.slice(-2);
        var day = '0'+oneMonthAgo.getDate();
        date += '/'+ day.slice(-2);
        oneMonthAgo.setDate(oneMonthAgo.getDate()+1);
        monthlyArr.push(date);
    }
    return monthlyArr;
};

export const makeMonthlyDateStrArr = () => {
    const monthlyArr = [];
    var now = new Date();
    var oneMonthAgo = new Date(now.getTime());
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 28);
    var oneMonthTmp = `${oneMonthAgo.getFullYear()}${('0'+(oneMonthAgo.getMonth()+1)).slice(-2)}${('0'+(oneMonthAgo.getDate())).slice(-2)}`;
    monthlyArr.push(`${oneMonthTmp}24`);
    oneMonthAgo.setDate(oneMonthAgo.getDate()+1);
    while(oneMonthAgo <= now) {
        var date = `${now.getFullYear()}`;
        var month = '0' + (oneMonthAgo.getMonth()+1);
        date += month.slice(-2);
        var day = '0'+oneMonthAgo.getDate();
        date += day.slice(-2);
        monthlyArr.push(`${date}24`);
        oneMonthAgo.setDate(oneMonthAgo.getDate()+1);
    }
    return monthlyArr;
}

export const getTodayParameter = () => {
    var now = new Date();
    var year = now.getFullYear();
    var month = '0' + (now.getMonth()+1);
    var day = '0'+now.getDate();
    var hour = '0' + (now.getHours());

    var todayParam = year+'-'+month.slice(-2)+'-'+day.slice(-2);
    var hourParam = hour.slice(-2);
    return { todayParam, hourParam };
}

export const getYesterdayAndToday = () => {
    var now = new Date();
    var year = now.getFullYear();
    var month = '0' + (now.getMonth()+1);
    var yester = '0'+(now.getDate()-1);
    var day = '0'+(now.getDate());

    var yesterday = year+month.slice(-2)+yester.slice(-2);
    var today = year+month.slice(-2)+day.slice(-2);
    return { yesterday, today};
}

export const weeklyGraphXAxis = () => {
    const weekarr = makeWeeklyDateArr();
    const newWeekArr = [];
    weekarr.forEach((wa) => {
        newWeekArr.push(wa)
        newWeekArr.push('06:00')
        newWeekArr.push('12:00')
        newWeekArr.push('18:00')
    });
    return newWeekArr;
}

export const monthlyGraphAvgXAxis = () => {
    const newMonthlyAvg = [];
    const tmpMonthly = makeMonthlyDateArr();
    var nthWeek = 0;
    var startDay = '', endDay = '';
    tmpMonthly.forEach((tm, idx) => {
        if(idx % 7 === 0) {
            startDay = tm;
            nthWeek++;
        } else if(idx % 7 === 6) {
            endDay = tm;
            newMonthlyAvg.push(`${nthWeek}주차 (${startDay}~${endDay})`)
        }
    });
    return newMonthlyAvg;
}