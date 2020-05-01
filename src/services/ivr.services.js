import http from './httpService';

const apiEndpoint = 'http://localhost:8087/zongPortal/IVR/All';

export function getIVR() {
    return http.get(apiEndpoint);
}

export default {
    getIVR,
};
