input.onButtonPressed(Button.A, function () {
    gCube.setAGcubeSpeed(0, 100)
    gCube.setAGcubeSpeed(1, 100)
})
input.onButtonPressed(Button.B, function () {
    gCube.stopAllGcubeMotor()
})
gCube.waitFirstGcubeConnect()
gCube.waitAllGcubesConnect(2)
basic.forever(function () {

})