window.accelerometer = {
    initialize: function (dotnetHelper) {
        if (window.DeviceMotionEvent) {
            window.addEventListener('deviceorientation', function (event) {
                console.log('Acceleration:', event); // ここで値をログに出力
                dotnetHelper.invokeMethodAsync('OnDeviceMotion', event.alpha, event.beta, event.gamma);
            });
        } else {
            console.log('DeviceMotionEvent is not supported on this device'); // サポートされていない場合のログ
        }
    }
};
