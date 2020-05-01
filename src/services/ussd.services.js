import http from './httpService';

const apiEndpoint = 'http://localhost:8087/zongPortal/USSD/All';

export function getUSSD() {
    return http.get(apiEndpoint);
}

export default {
    getUSSD,
};
