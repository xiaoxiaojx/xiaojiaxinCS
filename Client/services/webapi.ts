enum Method {
    GET = "GET",
    POST = "POST"
}

export function getApiPrefix(): string {
    switch (location.hostname) {
      case "localhost":
        return `http://localhost:${process.env.PORT || "3000"}/api/`;
      default:
        return "http://47.100.96.203/api/";
    }
}

function getRequestInit(params: any, method: Method): RequestInit {
    return ({
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    });
}

export function webapi<T>(service: string, params = {}, method: Method = Method.POST): Promise<T> {
    const requestInput: RequestInfo = `${getApiPrefix()}${service}`;
    const requestInit: RequestInit = getRequestInit(params, method);
    return fetch(requestInput, requestInit)
        .then( response => response.json())
        .catch(error => {
            console.error(error.message);
        });
}