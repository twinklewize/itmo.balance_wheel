import firebase from "firebase/compat/app";

function getDateWithoutTime(date: Date) {
    return date.setHours(0,0,0,0);
}

function isSameDates(firstDate: Date | undefined, secondDate: Date) {
    if (firstDate == undefined) return false;
    return firstDate.getDate() === secondDate.getDate()
        && firstDate.getMonth() === secondDate.getMonth()
        && firstDate.getFullYear() == secondDate.getFullYear();
}

function getDayOfWeek(date: Date){
    return date.getDay()-1 === -1 ? 6 : date.getDay()-1;
}

function getStartOfWeek(date: Date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDayOfWeek(date));
}

function getDateFromTimestamp(date: string | firebase.firestore.Timestamp | undefined){
    if (date == undefined) return  undefined;
    return new Date(date as string);
}

function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 != 0) || year % 400 === 0;
}

export {isSameDates, getDateWithoutTime, getDayOfWeek, getStartOfWeek, getDateFromTimestamp, isLeapYear}