import { observable, useStrict } from "mobx";

useStrict(true);

class Store {
    constructor() {

    }
    @observable public data = "";
}

export default Store;