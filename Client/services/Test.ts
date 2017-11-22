import {
    webapi
} from "./webapi";

export function Test(data: {testData: string}): Promise<string> {
    return webapi<string>("test", data);
}