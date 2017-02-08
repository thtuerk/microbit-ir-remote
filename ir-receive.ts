/* This Script demonstrates reading from a SAMSUNG remote. It expects
 * 
 * Pin 2: connected to an IR receiver
 * Pin 1: an LED for turning on / off
 * Pin 0: an LED for dimming
*/

// Set up
var br = 255;
pins.analogWritePin(AnalogPin.P0, br);
pins.digitalWritePin(DigitalPin.P1, 1)
pins.analogReadPin(AnalogPin.P2);

// Read a SAMSUNG IR code
function wait_for_signal() {
    while (pins.analogReadPin(AnalogPin.P2) > 500) { }
}

function read_on() {
    var c = 0;
    while (pins.analogReadPin(AnalogPin.P2) < 500 && c < 500) {
        c++;
    }
    return c;
}

function read_off() {
    var c = 0;
    while (pins.analogReadPin(AnalogPin.P2) > 500 && c < 500) {
        c++;
    }
    return c;
}

function read_SAMSUNG() {
    wait_for_signal();
    var c1 = 0;
    var c2 = 0;
    var res = 0;
    while (c1 < 25 && c2 < 25) {
        c1 = read_on();
        c2 = read_off();
    }
    for (var i = 0; i < 32; i++) {
        c1 = read_on();
        c2 = read_off();
        res = res + res;
        if (c2 > 10) {
            res = res + 1;
        }
    }
    return res;
}

// IR codes are 32 bit. The language supports only signed 32 bit integers
// When comparing codes, one has to adapt 32 unsigned numbers as found in the
// usual code tables like https://github.com/Waelson/Comandos-IR/blob/master/TV%20Samsung.txt
// to unsigned numbers. I.e. one needs to compute 2**32 - unsigned code.
basic.forever(() => {
    var n = read_SAMSUNG();
    if (n == -522182433) {
        // Key 1
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else if (n == -522149793) {
        // Key 2
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else if (n == -522133473) {
        // Volume Up
        if (br < 500) {
            br = br + 10;
        } else {
            br = 512;
        }
        pins.analogWritePin(AnalogPin.P0, br);
    } else if (n == -522137553) {
        // Volume Down
        if (br > 10) {
            br = br - 10;
        } else {
            br = 0;
        }
        pins.analogWritePin(AnalogPin.P0, br);
    } else {
        // Turn on for debugging or finding other codes
        // basic.showNumber(n); 
    }
})

