import http from './httpService';

const apiEndpoint = 'http://localhost:8081/zongPortal/BusinessOrder/All';

export function getOrders() {
    return http.get(apiEndpoint);
}



export default {
    getOrders,
};
