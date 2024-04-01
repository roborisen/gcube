input.onButtonPressed(Button.A, function () {
    gcube.setAGcubeRotationAngle(2, 720)
    gcube.setAGcubeSpeed(3, 50)
})
input.onGesture(Gesture.TiltLeft, function () {
    gcube.setAGcubeServoAngle(2, 45)
    gcube.setMatrixDisplay(
        3,
        "__-__-__-__-__-__-__-__-__",
        "__-__-__#__-__-__-__-__-__",
        "__-__#__#__-__-__-__-__-__",
        "__#__#__#__#__#__#__#__#__",
        "__#__#__#__#__#__#__#__#__",
        "__-__#__#__-__-__-__-__-__",
        "__-__-__#__-__-__-__-__-__",
        "__-__-__-__-__-__-__-__-__"
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
        "__-__-__-__-__-__-__-__-__",
        "__-__-__-__-__-__#__-__-__",
        "__-__-__-__-__-__#__#__-__",
        "__#__#__#__#__#__#__#__#__",
        "__#__#__#__#__#__#__#__#__",
        "__-__-__-__-__-__#__#__-__",
        "__-__-__-__-__-__#__-__-__",
        "__-__-__-__-__-__-__-__-__"
    )
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(4)
basic.forever(function () {
    if (gcube.readCubeSensor(3, gcube.SensorType.ProximitySensor) < 200) {
        gcube.rotateWheelRobot(gcube.RobotName.AutoCar, gcube.readCubeAccelerometer(3, gcube.CubeAccelerometer.Xdata))
        gcube.moveWheelRobot(gcube.RobotName.AutoCar, gcube.readCubeAccelerometer(3, gcube.CubeAccelerometer.Ydata) / 3)
    }
})
