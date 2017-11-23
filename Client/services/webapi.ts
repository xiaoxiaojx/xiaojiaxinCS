type Method = "GET" | "POST";

function getApiPrefix(): string {
    switch (location.hostname) {
      case "localhost":
        return `http://47.100.96.203:${process.env.PORT || "3000"}/api/`;
      default:
        return `http://47.100.96.203:${process.env.PORT || "3000"}/api/`;
    }
}

function getRequestInit(params: any, method: Method): RequestInit {
    return ({
        method,
        // headers: {
        //     "Content-Type": "application/json"
        // },
        body: JSON.stringify(params)
//        credentials: "include",
    });
}

export function webapi<T>(service: string, params = {}, method: Method = "POST"): Promise<T> {
    const requestInput: RequestInfo = `${getApiPrefix()}${service}`;
    const requestInit: RequestInit = getRequestInit(params, method);
    return fetch(requestInput, requestInit)
        .then( response => response.json())
        .catch(error => {
            console.error(error.message);
        });
}