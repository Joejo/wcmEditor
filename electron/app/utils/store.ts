const EventEmitter = require('events');
const ElectronStore = require('electron-store');

interface Store {
    nameSpaces: any,
    store: any
}
class Store extends EventEmitter{
    constructor(nameSpaces){
        super();
        this.nameSpaces = nameSpaces;
        this.store = new ElectronStore();
    }

    set(values){
        this.store.set(`${this.nameSpaces}-key`, values);
    }

    get(){
        this.store.get(`${this.nameSpaces}-key`);
    }

    add(value){
        let newValue = this.store.get(`${this.nameSpaces}-key`);
        newValue = newValue.filter((v) => v != value);
        newValue.unshift(value);
        this.store.set(`${this.nameSpaces}-key`, newValue);
    }

    remove(value){
        let newValue = this.store.get(`${this.nameSpaces}-key`);
        if(Array.isArray(newValue)){
            newValue = newValue.filter((v) => v != value);
            this.store.set(`${this.nameSpaces}-key`, newValue);
        }
    }

    has(value){
        const data = this.store.get(`${this.nameSpaces}-key`);
        return data.some((v => v === value));
    }

    delete(){
        this.store.delete(`${this.nameSpaces}-key`);
    }

    get dataStore(){
        return this.store.get(`${this.nameSpaces}-key`);
    }
}

module.exports = Store;
