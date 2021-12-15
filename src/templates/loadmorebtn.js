export default class LoadmoreBtn {
    constructor({ button, hidden = false }) {
        this.refs = this.getRefs(button);
        hidden && this.hide();
}

    getRefs(button) {
        const refs = {};
        refs.button = document.querySelector(button);
        return refs;
    }
    
    enable() {
        this.refs.button.disabled = false;
    }

    disable() {
        this.refs.button.disabled = true;
    }

    show() {
    this.refs.button.classList.remove('is-hidden');
    }

    hide() {
        this.refs.button.classList.add('is-hidden');
    }


}