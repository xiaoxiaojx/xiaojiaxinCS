import { observable, useStrict, action } from "mobx";

useStrict(true);

class Store {
    constructor() {
    }
    @observable public showLoginRegisterModal: boolean = false;
    @action.bound public setShowLoginRegisterModal(data: boolean) {
        if (this.showLoginRegisterModal !== data)
            this.showLoginRegisterModal = data;
    }
}

export default Store;