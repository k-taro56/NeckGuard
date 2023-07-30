function ClickRequestDeviceSensor() {
    //. ユーザーに「許可」を求めるダイアログを表示
    DeviceOrientationEvent.requestPermission().then(function (response) {
        if (response === 'granted') {
            //. 許可された場合のみイベントハンドラを追加できる
            window.addEventListener("deviceorientation", deviceOrientation);
            //. 画面上部のボタンを消す
            $('#sensorrequest').css('display', 'none');
        }
    }).catch(function (e) {
        console.log(e);
    });
}

window.accelerometer = {
    initialize: function (dotnetHelper) {
        if (window.DeviceMotionEvent) {
            if (DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function') {
                //. iOS 13 以上の場合、
                //. 画面上部に「センサーの有効化」ボタンを追加
                var banner = '<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">センサーの有効化</p></div>';
                $('body').prepend(banner);
            } else {
                window.addEventListener('deviceorientation', function (event) {
                    const s = JSON.stringify(event);
                    console.log('Orientation:', s); // ここで値をログに出力
                    dotnetHelper.invokeMethodAsync('OnDeviceMotion', s);
                });
            }
        } else {
            console.log('DeviceOrientationEvent is not supported on this device'); // サポートされていない場合のログ
        }
    }
};
