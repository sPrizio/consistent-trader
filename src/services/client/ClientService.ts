/**
 * Performs a generic HTTP GET call
 *
 * @param url api url
 */
export default async function get(url: string) {
    // Return a new promise.
    return new Promise<string>(function(resolve, reject) {
        // Do the usual XHR stuff
        const req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc.
            // so check the status
            if (req.status === 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

/**
 * Performs a generic HTTP DELETE call
 *
 * @param url api url
 */
export async function cDelete(url: string) {
    // Return a new promise.
    return new Promise<string>(function(resolve, reject) {
        // Do the usual XHR stuff
        const req = new XMLHttpRequest();
        req.open('DELETE', url);

        req.onload = function() {
            // This is called even on 404 etc.
            // so check the status
            if (req.status === 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

/**
 * Performs a generic HTTP POST call
 *
 * @param url api url
 * @param body request body
 */
export async function post(url: string, body: object) {
    // Return a new promise.
    return new Promise<string>(function(resolve, reject) {
        // Do the usual XHR stuff
        const req = new XMLHttpRequest();
        req.open('POST', url);
        req.setRequestHeader('Accept', 'application/json')
        req.setRequestHeader('Content-Type', 'application/json')

        req.onload = function() {
            // This is called even on 404 etc.
            // so check the status
            if (req.status === 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send(JSON.stringify(body));
    });
}