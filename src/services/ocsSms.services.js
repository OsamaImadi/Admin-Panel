import http from './httpService8084';

const apiEndpoint = 'http://localhost:8084/zongPortal/OcsHits/Sms/All';

export function getOcsSms() {
    return http.get(apiEndpoint);
}



export default {
    getOcsSms,
};
