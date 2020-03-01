import http from './httpService8082';

const apiEndpoint = 'http://localhost:8082//zongPortal/SmsSubscriptions/All';

export function getSms() {
    return http.get(apiEndpoint);
}


export default {
    getSms,
};
