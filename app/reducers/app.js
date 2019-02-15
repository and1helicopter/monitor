// @flow
import fs from 'fs';
import port from './app/port';
import lang from './app/lang';
import config from './app/config';
import form from './app/form';
import format from './app/format';

const filePathPort  = 'configuration_file/port.json';
const filePathLang  = 'configuration_file/lang.json';
const filePathConfig  = 'configuration_file/config.json';
const filePathForm  = 'configuration_file/form.json';
const filePathFormat  = 'configuration_file/format.json';


const portState = fs.existsSync(filePathPort) ? JSON.parse(fs.readFileSync(filePathPort)) : undefined;
const langState = fs.existsSync(filePathLang) ? JSON.parse(fs.readFileSync(filePathLang)) : undefined;
const configState = fs.existsSync(filePathConfig) ? JSON.parse(fs.readFileSync(filePathConfig)) : undefined;
const formState = fs.existsSync(filePathForm) ? JSON.parse(fs.readFileSync(filePathForm)) : undefined;
const formatState = fs.existsSync(filePathFormat) ? JSON.parse(fs.readFileSync(filePathFormat)) : undefined;

// const fs = windows.require('fs');

export default function app() {
    return {
        port: port(portState, {}),
        lang: lang(langState, {}),
        config: config(configState, {}),
        form: form(formState, {}),
        format: format(formatState, {}),
    };
}
