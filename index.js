'use strict';

import { NativeModules, DeviceEventEmitter } from 'react-native';

export const NfcDataType = {
    NDEF : "NDEF",
    TAG : "TAG"
};

export const NdefRecordType = {
    TEXT : "TEXT",
    URI : "URI",
    MIME : "MIME"
};


let _registeredToEvents = false;
const _listeners = [];

let _registerToEvents = () => {
    if(!_registeredToEvents){
        NativeModules.ReactNativeNFC.getStartUpNfcData(_notifyListeners);
        DeviceEventEmitter.addListener('__NFC_DISCOVERED', _notifyListeners);
        _registeredToEvents = true;
    }
};

let _notifyListeners = (data) => {
    if(data){
        for(let i in _listeners){
            _listeners[i](data);
        }
    }
};

const NFC = {};

NFC.addListener = (callback) => {
    _listeners.push(callback);
    _registerToEvents();
};

NFC.removeListener = (callback) => {
    if(_listeners.includes(callback)) {
        _listeners.splice(_listeners.indexOf(callback));
    }
};

export default NFC;