input.onButtonPressed(Button.A, function () {
    gcube.setAGcubeRotationAngle(0, 360)
    gcube.setAGcubeSpeed(1, 100)
    gcube.setAGcubeSpeed(2, 50)
})
input.onGesture(Gesture.LogoUp, function () {
    gcube.startRollingMatrixImage(1000)
})
input.onGesture(Gesture.TiltLeft, function () {
    gcube.setMatrixDisplay(
        1,
        "__-__-__-__-__-__-__-__-__",
        "__-__-__#__-__-__-__-__-__",
        "__-__#__#__-__-__-__-__-__",
        "__#__#__#__#__#__#__#__#__",
        "__#__#__#__#__#__#__#__#__",
        "__-__#__#__-__-__-__-__-__",
        "__-__-__#__-__-__-__-__-__",
        "__-__-__-__-__-__-__-__-__"
    )
    gcube.setAGcubeServoAngle(3, 45)
})
input.onButtonPressed(Button.AB, function () {
    gcube.stopAllGcubeMotor()
})
input.onButtonPressed(Button.B, function () {
    gcube.setAGcubeRotationAngle(0, -360)
    gcube.setAGcubeSpeed(1, -100)
    gcube.setAGcubeSpeed(2, -50)
})
input.onGesture(Gesture.TiltRight, function () {
    gcube.setMatrixDisplay(
        1,
        "__-__-__-__-__-__-__-__-__",
        "__-__-__-__-__-__#__-__-__",
        "__-__-__-__-__-__#__#__-__",
        "__#__#__#__#__#__#__#__#__",
        "__#__#__#__#__#__#__#__#__",
        "__-__-__-__-__-__#__#__-__",
        "__-__-__-__-__-__#__-__-__",
        "__-__-__-__-__-__-__-__-__"
    )
    gcube.setAGcubeServoAngle(3, 135)
})
input.onGesture(Gesture.LogoDown, function () {
    gcube.startShiftingMatrixImage(1)
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(4)
gcube.defaultRollingMatrixImage(
    "A",
    "__-__-__-__-__-__-__-__-__",
    "__-__-__-__-__-__-__-__-__",
    "__-__-__-__#__#__-__-__-__",
    "__-__-__#__#__#__#__-__-__",
    "__-__-__#__#__#__#__-__-__",
    "__-__-__-__#__#__-__-__-__",
    "__-__-__-__-__-__-__-__-__",
    "__-__-__-__-__-__-__-__-__"
)
