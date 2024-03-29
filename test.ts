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
    if (gcube.readCubeSensor(3, sensorType.proximitysensor) < 200) {
        gcube.rotateWheelRobot(robotName.autocar, gcube.readCubeAccelerometer(3, cubeAccelerometer.xdata))
        gcube.moveWheelRobot(robotName.autocar, gcube.readCubeAccelerometer(3, cubeAccelerometer.ydata) / 3)
    }
})
