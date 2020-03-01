import http from './httpService';

const apiEndpoint = '/';

function driverUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getBusiness() {
    return http.get(apiEndpoint);
}

export function getDriver(id) {
    return http.get(driverUrl(id));
}

export function saveDriver(driver) {
    if (driver._id) {
        const body = { ...driver };
        delete body._id;
        return http.put(driverUrl(driver._id), body);
    }

    return http.post(apiEndpoint, driver);
}

export function deleteDriver(driverId) {
    return http.delete(driverUrl(driverId));
}

export default {
    getBusiness,
    getDriver,
    saveDriver,
    deleteDriver
};
