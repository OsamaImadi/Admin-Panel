import http from './httpService';

const apiEndpoint = 'http://localhost:8081/zongPortal/Rent/All';

export function getRent() {
    return http.get(apiEndpoint);
}

export default {
    getRent,
};
