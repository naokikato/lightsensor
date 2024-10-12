/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="光センサ"
namespace IMLlightsensor {

    //% block
    //% block="明るさ %pin"
    //% weight=100
    export function getLightwithPin(pin: AnalogPin): number {
        return getlight(pin)
    }

    function getlight(pin: AnalogPin): number{
        return Math.round(pins.analogReadPin(pin) / 800 * 1000) / 10
    }
}
