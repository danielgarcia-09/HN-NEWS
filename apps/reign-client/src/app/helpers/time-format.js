import moment from 'moment';

export const timeFormat = (time) => {
    let toDate = new Date(time)
    return moment(toDate).fromNow();
}