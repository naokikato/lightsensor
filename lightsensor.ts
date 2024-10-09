/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="光センサ v1.2"
namespace IMLlightsensor {

    //% block
    //% block="明るさ %pin"
    //% weight=100   
    export function getLight(pin: AnalogPin): number {
        return Math.round( pins.analogReadPin(pin)/800*1000 )/10
    }
}
