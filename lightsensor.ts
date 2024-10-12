/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="光センサ"
namespace IMLlightsensor {

    let datapin = AnalogPin.P0

    //% block
    //% block="光センサのピンを %pin に設定する"
    //% weight=100   
    export function setPin(pin: AnalogPin): void {
        datapin = pin
    }
    //% block
    //% block="明るさ %pin"
    //% weight=99
    export function getLight(): number {
        return getlight(datapin)
    }
    //% block
    //% block="明るさ %pin"
    //% weight=98   
    export function getLightwithPin(pin: AnalogPin): number {
        return getlight(pin)
    }

    function getlight(pin: AnalogPin): number{
        return Math.round(pins.analogReadPin(pin) / 800 * 1000) / 10
    }

    //% block="光センサの閾値を $value に設定する"
    //% weight=90   color =#3fbc41
    export function setLightSensor(value: number) {
        threshold = value;
        startListening();
    }

    //% block="光センサの出力が閾値以上になったとき"
    //% weight=89   color =#3fbc41
    export function onLightDetected(handler: () => void) {
        control.onEvent(LIGHT_EVENT_ID, EventBusValue.MICROBIT_EVT_ANY, handler);
    }

    const LIGHT_EVENT_ID = 1000;
    let threshold = 50;
    let interval = 100;

    // イベントリスナーの開始
    function startListening() {
        control.inBackground(() => {
            while (true) {
                let soundLevel = pins.analogReadPin(datapin);
                if (soundLevel >= threshold) {
                    // イベントを発生させる
                    control.raiseEvent(LIGHT_EVENT_ID, soundLevel);
                }
                basic.pause(interval);
            }
        });
    }
}
