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