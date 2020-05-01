import http from './httpService';

const apiEndpoint = 'http://localhost:8086/zongPortal/DataEcdrs/All';

export function getTotalEcdrs() {
    return http.get(apiEndpoint);
}

export default {
    getTotalEcdrs,
};
