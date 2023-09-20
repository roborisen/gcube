input.onButtonPressed(Button.A, function () {
    GCube.setAGCubeSpeed(0, 100)
    GCube.setAGCubeSpeed(1, 100)
})
input.onButtonPressed(Button.B, function () {
    GCube.stopAllGCubeMotor()
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(2)
basic.forever(function () {

})