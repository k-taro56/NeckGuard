window.accelerometer = {
    requestPermission: function () {
        //. ユーザーに「許可」を求めるダイアログを表示
        DeviceOrientationEvent.requestPermission().then(function (response) {
            if (response === 'granted') {
                //. 許可された場合のみイベントハンドラを追加できる
                window.addEventListener("deviceorientation", function (event) {
                    const s = JSON.stringify(event);
                    console.log('Orientation:', s); // ここで値をログに出力
                    this.dotnetHelper.invokeMethodAsync('OnDeviceMotion', s);
                });
            }
        }).catch(function (e) {
            console.log(e);
        });
    },

    initialize: function (dotnetHelper) {
        this.dotnetHelper = dotnetHelper;
        if (window.DeviceMotionEvent) {
            window.addEventListener('deviceorientation', function (event) {
                const s = JSON.stringify(event);
                console.log('Orientation:', s); // ここで値をログに出力
                this.dotnetHelper.invokeMethodAsync('OnDeviceMotion', s);
            });
        } else {
            console.log('DeviceOrientationEvent is not supported on this device'); // サポートされていない場合のログ
        }
    }
};
