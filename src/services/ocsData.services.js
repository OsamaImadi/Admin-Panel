import http from './httpService8084';

const apiEndpoint = 'http://localhost:8084/zongPortal/OcsHits/Data/All';

export function getOcsData() {
    return http.get(apiEndpoint);
}



export default {
    getOcsData,
};
