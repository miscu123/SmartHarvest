async function api(path, method = 'GET', body = null) {
    const url = `http://www.localhost:8080/order/${path}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        },
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);
    
    if (!response.ok) {
        return {
            success: false,
            status: response.status,
            message: (data && data.message) || response.statusText || 'Request failed',
        };
    }
    
    return {
        success: true,
        status: response.status,
        body: data,
    };
}

export function addOrder(orderRequest) {
    return api('sendOrder', 'POST', orderRequest);
}

export function getAllCustomerOrders() {
    return api('getCustomerOrders', 'GET');
}

export function getRecentOrders() {
    return api('getRecentOrders', 'GET');
}

export function totalOrders() {
    return api('totalOrders', 'GET');
}

export function totalRevenue() {
    return api('totalRevenue', 'GET');
}

export function monthly() {
    return api('monthly', 'GET');
}

export function getAllOrders() {
    return api('getAllOrders', 'GET');
}

export function deleteOrder(id) {
    return api(`deleteOrder/${id}`, 'DELETE');
}

export function updateOrder(id, data) {
    return api(`updateOrder/${id}`, 'PUT', data);
}

export function cancelOrder(id) {
    return api(`cancelOrder/${id}`, 'PUT', null);
}