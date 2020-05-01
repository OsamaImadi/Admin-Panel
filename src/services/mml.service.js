import http from './httpService';

const apiEndpoint = 'http://localhost:8087/zongPortal/MML/All';

export function getMML() {
    return http.get(apiEndpoint);
}

export default {
    getMML,
};
