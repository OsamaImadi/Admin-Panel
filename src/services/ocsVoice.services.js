import http from './httpService8084';

const apiEndpoint = 'http://localhost:8084/zongPortal/OcsHits/Voice/All';

export function getOcsVoice() {
    return http.get(apiEndpoint);
}



export default {
    getOcsVoice,
};
