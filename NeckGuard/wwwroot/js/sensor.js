window.accelerometer = {
    initialize: function (dotnetHelper) {
        if (window.DeviceMotionEvent) {
            window.addEventListener('deviceorientation', function (event) {
                const s = JSON.stringify(event);
                console.log('Orientation:', s); // ここで値をログに出力
                dotnetHelper.invokeMethodAsync('OnDeviceMotion', s);
            });
        } else {
            console.log('DeviceOrientationEvent is not supported on this device'); // サポートされていない場合のログ
        }
    }
};
