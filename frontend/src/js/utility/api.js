const request = require('superagent');


/**
 * Funcion para obtener el token
 * */
function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
        return `Token ${token}`;
    }
    return false;
}

/**
 * Funcion para hacer la url absoluta con query string a partir de una Url relativa y params
 * @param path: string: ruta relativa
 * @param params: dict: parametros para poner como query string
 * @return: string: string con la url absoluta para la peticion
 * */
export function makeUrl(path, params = {}) {
    let url = '/api';
    if (path[0] === '/') {
        url += `${path}/`;
    } else {
        url += `/${path}/`;
    }
    let hasQueue = false; // se coloca que no hay aun query string
    // por cada atributo en los params se inserta en el query string
    const dicKeys = Object.keys(params);
    dicKeys.forEach((row) => {
        if (hasQueue) {
            url += `&${row}=${params[row]}`;
        } else {
            url += `?${row}=${params[row]}`;
            hasQueue = true;
        }
    });
    // Se retorna la url absoluta con query string si fuera el caso
    return url;
}

/**
 * Funcion para manejar los errores de cualquier petición
 * @param response: response: response de la peticion
 * */
function errorHandler(response) {
    // Estado 401 o 403 redirigen al login
    if (response.statusCode === 401 || response.statusCode === 403) {
        localStorage.removeItem('token');
        window.location.assign('/#/login');
    } else {
        // console.log(response.body);
    }
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param params: dict: parametros para query string, opcionales
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _post(path, body, params = {}) {
    const url = makeUrl(path, params);
    const token = getToken();
    if (getToken()) {
        return request.post(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
    }
    return request.post(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del post
 * */
function post(path, body, params = {}) {
    return new Promise((resolve, reject) => {
        _post(path, body, params).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response.body);
        });
    });
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar sdf sdf
 * @param params: dict: parametros para query string, opcionales
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _postMultiPart(path, body, attachments, params = {}) {
    const url = makeUrl(path, params);
    const token = getToken();
    let result;
    if (getToken()) {
        result = request.post(url).set('Authorization', token);
    } else {
        result = request.post(url);
    }
    attachments.forEach((attachment) => {
        result.attach(attachment.name, attachment.file);
    });
    const data = JSON.stringify(body);
    result.field('data', data);
    return result;
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del post
 * */
function postAttachments(path, body, attachments, params = {}) {
    return new Promise((resolve, reject) => {
        _postMultiPart(path, body, attachments, params).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response.body);
        });
    });
}

/**
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _putMultiPart(path, body, attachments, params = {}) {
    const url = makeUrl(path, params);
    const token = getToken();
    let result;
    if (getToken()) {
        result = request.put(url).set('Authorization', token);
    } else {
        result = request.put(url);
    }
    attachments.forEach((attachment) => {
        result.attach(attachment.name, attachment.file);
    });
    const data = JSON.stringify(body);
    result.field('data', data);
    return result;
}

/**
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del put
 * */
function putAttachments(path, body, attachments, params = {}) {
    return new Promise((resolve, reject) => {
        _putMultiPart(path, body, attachments, params).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response.body);
        });
    });
}

/**
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param params: dict: parametros para query string, opcionales
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _put(path, body, params = {}) {
    const url = makeUrl(path, params);
    const token = getToken();
    if (getToken()) {
        return request.put(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
    }
    return request.put(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del put
 * */
function put(path, body, params = {}) {
    return new Promise((resolve, reject) => {
        _put(path, body, params).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response.body);
        });
    });
}
/**
 * Funcion para hacer una peticion delete
 * @param path: string: path relativo de la peticion
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _delete(path) {
    const url = makeUrl(path);
    const token = getToken();
    if (getToken()) {
        return request.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
    }
    return request.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion delete
 * @param path: string: path relativo de la peticion
 * @return: Promise: promise del delete
 * */
function eliminar(path) {
    return new Promise((resolve, reject) => {
        _delete(path).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response.body);
        });
    });
}

/**
 * Funcion para hacer una peticion get
 * @param path: string: path relativo de la peticion
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: instancia de superagent lista para ser recibida como promise
 * */
function _get(path, params = {}) {
    const url = makeUrl(path, params);
    const token = getToken();
    if (getToken()) {
        return request.get(url).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
    }
    return request.get(url).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion get
 * @param path: string: path relativo de la peticion
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del get
 * */
function get(path, params = {}) {
    return new Promise((resolve, reject) => {
        _get(path, params).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response);
        });
    });
}

export const api = { get, post, put, eliminar, postAttachments, putAttachments };
