window.accelerometer = {
    initialize: function (dotnetHelper) {
        if (window.DeviceMotionEvent) {
            window.addEventListener('deviceorientation', function (event) {
                console.log('Acceleration:', event); // �����Œl�����O�ɏo��
                dotnetHelper.invokeMethodAsync('OnDeviceMotion', event.alpha, event.beta, event.gamma);
            });
        } else {
            console.log('DeviceMotionEvent is not supported on this device'); // �T�|�[�g����Ă��Ȃ��ꍇ�̃��O
        }
    }
};
