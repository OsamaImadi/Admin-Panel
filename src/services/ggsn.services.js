import http from './httpService8085';

const apiEndpoint = 'http://localhost:8085/zongPortal/GGSN/All';

export function getGgsn() {
    return http.get(apiEndpoint);
}



export default {
    getGgsn,
};
