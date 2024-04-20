input.onButtonPressed(Button.A, function () {
    gcube.setAGcubeRotationAngle(2, 720)
    gcube.setAGcubeSpeed(3, 50)
})
input.onGesture(Gesture.TiltLeft, function () {
    gcube.setAGcubeServoAngle(2, 45)
    gcube.setMatrixDisplay(
        3,
        "__0__0__0__0__0__0__0__0__",
        "__0__0__1__0__0__0__0__0__",
        "__0__1__1__0__0__0__0__0__",
        "__1__1__1__1__1__1__1__1__",
        "__1__1__1__1__1__1__1__1__",
        "__0__1__1__0__0__0__0__0__",
        "__0__0__1__0__0__0__0__0__",
        "__0__0__0__0__0__0__0__0__"
    )
})
input.onButtonPressed(Button.AB, function () {
    gcube.stopAllGcubeMotor()
})
input.onButtonPressed(Button.B, function () {
    gcube.setAGcubeRotationAngle(2, -720)
    gcube.setAGcubeSpeed(3, -50)
})
input.onGesture(Gesture.TiltRight, function () {
    gcube.setAGcubeServoAngle(2, 135)
    gcube.setMatrixDisplay(
        3,
        "__0__0__0__0__0__0__0__0__",
        "__0__0__0__0__0__1__0__0__",
        "__0__0__0__0__0__1__1__0__",
        "__1__1__1__1__1__1__1__1__",
        "__1__1__1__1__1__1__1__1__",
        "__0__0__0__0__0__1__1__0__",
        "__0__0__0__0__0__1__0__0__",
        "__0__0__0__0__0__0__0__0__"
    )
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(4)
basic.forever(function () {
    if (gcube.readInternalCubeSensor(3, gcube.InternalSensor.ProximitySensor) < 200) {
        gcube.rotateWheelRobot(gcube.RobotName.AutoCar, gcube.readCubeAccelerometer(3, gcube.CubeAccelerometer.Xdata))
        gcube.moveWheelRobot(gcube.RobotName.AutoCar, gcube.readCubeAccelerometer(3, gcube.CubeAccelerometer.Ydata) / 3)
    }
})
