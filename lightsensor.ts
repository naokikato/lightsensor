/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="光センサ"
namespace IML_lightsensor {

    //% block
    //% block="明るさ %pin"
    //% weight=100
    export function getLight(pin: AnalogPin): number {
        return Math.round(pins.analogReadPin(pin) / 800 * 1000) / 10
    }

    let datapin = AnalogPin.P0
    const LIGHT_EVENT_ID1 = 1001;
    const LIGHT_EVENT_ID2 = 1002;
    let threshold1 = 70;
    let threshold2 = 40;
    let interval = 100;

    //% block
    //% block="%pin につなげた光センサの閾値の上を $value1 下を $value2 に設定する"
    //% weight=90 color=#3fbc41
    export function setLightSensor(pin: AnalogPin, value1: number, value2: number) {
        datapin = pin
        threshold1 = value1
        threshold2 = value2
        startListening()
    }
    //% block
    //% block="明るさが閾値以上になったとき"
    //% weight=80 color=#3fbc41
    export function onLightDetected1(handler: () => void) {
        control.onEvent(LIGHT_EVENT_ID1, EventBusValue.MICROBIT_EVT_ANY, handler);
    }
    //% block
    //% block="明るさが閾値以下になったとき"
    //% weight=70 color=#3fbc41
    export function onLightDetected2(handler: () => void) {
        control.onEvent(LIGHT_EVENT_ID2, EventBusValue.MICROBIT_EVT_ANY, handler);
    }

    // イベントリスナーの開始
    function startListening() {
        control.inBackground(() => {
            while (true) {
                let Level = getLight(datapin)
                if (Level >= threshold1) {
                    // イベントを発生させる
                    control.raiseEvent(LIGHT_EVENT_ID1, Level);
                }
                if (Level <= threshold2) {
                    // イベントを発生させる
                    control.raiseEvent(LIGHT_EVENT_ID2, Level);
                }
                basic.pause(interval);
            }
        });
    }
}
