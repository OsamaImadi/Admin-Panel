import http from './httpService';

const apiEndpoint = 'http://localhost:8081/zongPortal/964Business/All';

export function getBusiness() {
    return http.get(apiEndpoint);
}



export default {
    getBusiness,
};
