import http from './httpService';

const apiEndpoint = 'http://localhost:8086/zongPortal/Etop/All';

export function getETOP() {
    return http.get(apiEndpoint);
}

export default {
    getETOP,
};
