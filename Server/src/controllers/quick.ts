import User from "../models/User";

declare var Promise;
const $findNot = {"_id": 0, "__v": 0};
//  const userInfo = {};

export function quickGetUserInfo(userName: string) {
    return new Promise((res, rej) => {
        // if (userInfo[userName]) {
        //     res(userInfo[userName]);
        // } else {
            User.findOne({userName}, $findNot, (err, doc) => {
                if ( err ) throw err;
                if (doc) {
    //                userInfo[userName] = doc;
                    res(doc);
                }
                else {
                    rej("error");
                }
            });
    //    }
    });
}