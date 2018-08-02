const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const debug = require('debug')('serial-esp8266:index');

const BAUD_RATE = 115200;
const SERIAL_PATH = '/dev/ttyUSB0';

const port = new SerialPort(SERIAL_PATH, {
    baudRate: BAUD_RATE,
    autoOpen: false
});

const parser = port.pipe(new Delimiter({delimiter: '\r\n'}));

port.on('open', function() {
    debug('Serial is now open...');
});
parser.on('data', function (data) {
    debug('Data: ', data);
});
parser.on('readable', function () {
    debug('Readable Data: ', port.read());
});

port.open(function (err) {
    setInterval(function() {
        port.write('123', function(err) {
            if (err) {
                return debug('Error on write: ', err.message);
            }
            debug('Message written');
        });
    }, 2000);
});

const list = SerialPort.list().then(function (ports) {

    debug(ports);
}).catch(err) {...});

debug('List', list);
