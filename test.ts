input.onButtonPressed(Button.A, function () {
    GCube.setAGCubeRotationAngle(0, 360)
    GCube.setAGCubeSpeed(1, 100)
    GCube.setAGCubeSpeed(2, 50)
})
input.onGesture(Gesture.LogoUp, function () {
    GCube.startRollingMatrixImage(1000)
})
input.onGesture(Gesture.TiltLeft, function () {
    GCube.setMatrixDisplay(
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
    GCube.setAGCubeServoAngle(3, 45)
})
input.onButtonPressed(Button.AB, function () {
    GCube.stopAllGCubeMotor()
})
input.onButtonPressed(Button.B, function () {
    GCube.setAGCubeRotationAngle(0, -360)
    GCube.setAGCubeSpeed(1, -100)
    GCube.setAGCubeSpeed(2, -50)
})
input.onGesture(Gesture.TiltRight, function () {
    GCube.setMatrixDisplay(
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
    GCube.setAGCubeServoAngle(3, 135)
})
input.onGesture(Gesture.LogoDown, function () {
    GCube.startShiftingMatrixImage(1)
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(4)
GCube.defaultRollingMatrixImage(
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
