input.onButtonPressed(Button.A, function () {
    gcube.setAGCubeRotationAngle(0, 360)
    gcube.setAGCubeSpeed(1, 100)
    gcube.setAGCubeSpeed(2, 50)
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
    gcube.setAGCubeServoAngle(3, 45)
})
input.onButtonPressed(Button.AB, function () {
    gcube.stopAllGCubeMotor()
})
input.onButtonPressed(Button.B, function () {
    gcube.setAGCubeRotationAngle(0, -360)
    gcube.setAGCubeSpeed(1, -100)
    gcube.setAGCubeSpeed(2, -50)
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
    gcube.setAGCubeServoAngle(3, 135)
})
input.onGesture(Gesture.LogoDown, function () {
    gcube.startShiftingMatrixImage(1)
})
gcube.waitFirstGCubeConnect()
gcube.waitAllGCubesConnect(4)
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
