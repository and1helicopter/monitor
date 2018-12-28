// @flow
import fs from 'fs';
import port from './app/port';
import lang from './app/lang';
import form from './app/form';
import format from './app/format';

const filepath  = 'configuration_file/port.json';

const portState = fs.existsSync(filepath) ? JSON.parse(fs.readFileSync(filepath)) : undefined;
// const fs = windows.require('fs');

export default function app() {
    return {
        port: port(portState, {}),
        lang: lang(),
        form: form(),
        format: format()
    };
}
