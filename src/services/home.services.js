import http from './httpService8085';

const rentEndpoint = 'http://localhost:8081/zongPortal/Rent/Weekly';
const smsEndpoint = 'http://localhost:8082/zongPortal/SmsSubscriptions/Weekly';
const retailEndpoint = 'http://localhost:8081/zongPortal/964Business/Weekly';
const etopEndpoint = 'http://localhost:8086/zongPortal/Etop/Weekly';
const businessOrderEndpoint = 'http://localhost:8081/zongPortal/BusinessOrder/Weekly';

export function getWeeklyRent() {
    return http.get(rentEndpoint);
}
export function getWeeklyRetail() {
    return http.get(retailEndpoint);
}
export function getWeeklySms() {
    return http.get(smsEndpoint);
}
export function getWeeklyEtop() {
    return http.get(etopEndpoint);
}
export function getWeeklyBusiness() {
    return http.get(businessOrderEndpoint);
}



export default {
    getWeeklyRent,
    getWeeklyRetail,
    getWeeklySms,
    getWeeklyEtop,
    getWeeklyBusiness
};
