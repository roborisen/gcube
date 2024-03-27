## About GCube

GCube is a cube type module which include stepper motor, battery, sensors and BLE 5.0 cpu based board.
It is available to use dot-matrix, RC servo motor or various sensors with GCube, because GCube has general external sensor port.
With just 1 GCube you are able to make robotics and more and more GCubes you have, you can build any kind of robot.
We've released this extension for Micro:bit users to use GCube for robotics and IoT projects.

More information:
www.roborisen.com   qna@roborisen.com

[Manual] https://drive.google.com/drive/folders/1fqJUBc3_YiFQwCtpSOFDAteLwlszzoH4

[Activity] https://youtu.be/wTfnsPbgm3s

<br/>
<br/>

## How to connect GCubes to Micro:bit
* Step 1: Load program to Micro:bit using this GCube custom blocks
* Step 2: Attach Micro:bit to GCube using GCube-Edge connector module
* Step 3: Turn on the GCube of Step 2 
* Step 4: Click twice of the other GCubes (to the number of GCubes that user defined on user program at Step 1)
          (for dot-matrix application, you should attach dot matrix to GCube in advance)
* Step 5: If all GCubes are connected then the main mission of main routine of user program will be started

<br/>
<br/>

## Blocks of GCube

### wait for the first GCube is connected
```sig
GCube.waitFirstGCubeConnect(): void
```
This block is to wait for the first GCube is connected to Micro:bit (Micro:bit is monitoring GCube is turned on via serial data)

### wait for # GCubes are connected
```sig
GCube.waitAllGCubesConnect(cnumber: number): void
```
This block is to wait for # (user define the GCube number for their project) GCubes are connected

### set motor speed to # of the GCube #
```sig
GCube.setAGCubeSpeed(cubeIndex: number, motorSpeed: number): void
```
This block is set motor speed to # (-100~100, 100 is maximum speed i.e. 30rpm) of the GCube #

### set all GCube motor speed #...
```sig
GCube.setAllGCubeSpeed(dm: string, s7: number, s6: number, s5: number, s4: number, s3: number, s2: number, s1: number, s0: number): void
```
This block is set all GCube motor speed with the 8 argument numbers from GCube 7 to GCube 0

### stop all of the GCube motors
```sig
GCube.stopAllGCubeMotor(): void
```
This block is stop all of the GCube motors

### set rotation angle to # of the GCube #
```sig
GCube.setAGCubeRotationAngle(cubeIndex: number, rotationAngle: number): void
```
This block is to set rotation angle to # (-10000 ~ 10000 in degrees) of the GCube #

### set all GCube rotation angle #...
```sig
GCube.setAllGCubeRotationAngle(dm: string, r7: number, r6: number, r5: number, r4: number, r3: number, r2: number, r1: number, r0: number): void : void
```
This block is to set each GCube's rotation angle with the 8 argument numbers from GCube 7 to GCube 0

### set servo motor angle to # of the GCube #
```sig
GCube.setAGCubeServoAngle(cubeIndex: number, servoAngle: number): void
```
This block is to set servo motor angle to # (-10000 ~ 10000 in degrees) of the GCube #

### set all GCube servo motor angle #...
```sig
GCube.setAllGCubeServoMotorAngle(dm: string, a7: number, a6: number, a5: number, a4: number, a3: number, a2: number, a1: number, a0: number): void
```
This block is to set each GCube's servo motor rotation angle with the 8 argument numbers from GCube 7 to GCube 0

### set matrix image of the GCube #
```sig
GCube.setMatrixDisplay(cn: number, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string): void
```
This block is to set 8x8 dot-matrix image of the GCube #

### default rolling matrix image #...
```sig
GCube.defaultRollingMatrixImage(dm: string, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string): void
```
This block is to set default rolling 8x8 dot-matrix image with the 8 row image data

### start rolling matrix image for # seconds
```sig
GCube.startRollingMatrixImage(duration: number): void
```
This block is to start rolling 8x8 dot-matrix image from GCube 0 ~ GCube n for # seconds

### start shifting matrix image for the GCube #
```sig
startShiftingMatrixImage(cubeIndex: number): void
```
This block is to start shifting 8x8 dot-matrix image from GCube 0 ~ GCube n for # seconds
Shifting direction is depends on the acceleration sensor data of Micro:bit

<br/>
<br/>
<br/>

## Examples 

### Example 1
```blocks
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(3)
```
<a href="https://makecode.microbit.org/S52088-96748-89161-23790">This example</a> shows <br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. then three GCubes will be connected to Micro:bit<br/>
<br/>

### Example 2
```blocks
input.onButtonPressed(Button.A, function () {
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
})
input.onButtonPressed(Button.B, function () {
    GCube.startRollingMatrixImage(1000)
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(3)
```
<a href="https://makecode.microbit.org/S35219-78808-31549-03051">This example</a> shows<br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. set rolling 8x8 dot-matrix image<br/>
4. start rolling 8x8 dot-matrix (attatched to GCube 1 ... N) from GCube 1 to GCube 2<br/>
* 8x8 dot-matrix should be connected to GCube 1 & 2 for this example <br/>
<br/>

### Example 3
```blocks
input.onButtonPressed(Button.A, function () {
    GCube.setMatrixDisplay(
    1,
    "__-__-__-__-__-__-__-__-__",
    "__-__-__-__-__-__-__-__-__",
    "__-__-__-__#__#__-__-__-__",
    "__-__-__#__-__-__#__-__-__",
    "__-__-__#__-__-__#__-__-__",
    "__-__-__-__#__#__-__-__-__",
    "__-__-__-__-__-__-__-__-__",
    "__-__-__-__-__-__-__-__-__"
    )
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(3)
```
<a href="https://makecode.microbit.org/S51633-60732-00552-64204">This example</a> shows<br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. set 8x8 dot-matrix image of GCube 1 (#: LED ON -: LED OFF)<br/>
* 8x8 dot-matrix should be connected to GCube 1 & 2 for this example <br/>
<br/>						

### Example 4
```blocks
input.onButtonPressed(Button.A, function () {
    GCube.setAGCubeSpeed(1, 100)
    GCube.setAGCubeSpeed(2, 100)
})
input.onButtonPressed(Button.B, function () {
    GCube.stopAllGCubeMotor()
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(3)
```
<a href="https://makecode.microbit.org/S83314-90357-19040-82123">This example</a> shows<br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. when button 'A' is pressed, set motor speed of GCube 1 and GCube 2 to 100 (-100~100, 100: maximum speed of the motor, i.e. 30rpm)<br/>
4. when button 'B' is pressed, stop all of the GCube's motor (GCube 0 ~ 2) <br/>
<br/>						

### Example 5
```blocks
input.onButtonPressed(Button.A, function () {
    GCube.setAGCubeRotationAngle(0, 180)
    GCube.setAGCubeRotationAngle(1, 180)
    GCube.setAGCubeRotationAngle(2, 180)
})
input.onButtonPressed(Button.B, function () {
    GCube.setAGCubeRotationAngle(0, -300)
    GCube.setAGCubeRotationAngle(1, -300)
    GCube.setAGCubeRotationAngle(2, -300)
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(3)
```
<a href="https://makecode.microbit.org/S48642-39369-42354-73859">This example</a> shows<br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. when button 'A' is pressed, set motor rotation angle of GCube 0 ~ 2 to 180 degree<br/>
4. when button 'B' is pressed, set motor rotation angle of GCube 0 ~ 2 to -300 degree<br/>
<br/>						

### Example 6
```blocks
input.onButtonPressed(Button.A, function () {
    GCube.setAllGCubeRotationAngle(
    "A",
    0,
    0,
    0,
    0,
    0,
    180,
    180,
    180
    )
})
input.onButtonPressed(Button.B, function () {
    GCube.setAllGCubeRotationAngle(
    "A",
    0,
    0,
    0,
    0,
    0,
    -300,
    -300,
    -300
    )
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(3)
```
<a href="https://makecode.microbit.org/S10341-71019-59343-30137">This example</a> shows<br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. when button 'A' is pressed, set motor rotation angle of GCube 0~2 to 180 degree<br/>
4. when button 'B' is pressed, set motor rotation angle of GCube 0~2 to -300 degree<br/>
<br/>						

### Example 7
```blocks
input.onButtonPressed(Button.A, function () {
    GCube.setAGCubeServoAngle(1, 30)
})
input.onButtonPressed(Button.AB, function () {
    GCube.setAGCubeServoAngle(1, 90)
    GCube.setAGCubeServoAngle(2, 90)
})
input.onButtonPressed(Button.B, function () {
    GCube.setAGCubeServoAngle(2, 45)
})
GCube.waitFirstGCubeConnect()
GCube.waitAllGCubesConnect(3)
```
<a href="https://makecode.microbit.org/S14821-35391-54690-59634">This example</a> shows<br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. when button 'A' is pressed, set servor motor angle of GCube 1 to 30 degree<br/>
4. when button 'B' is pressed, set servor motor angle of GCube 2 to 45 degree<br/>
5. when button 'A+B' is pressed, set servor motor angle of GCube 1~2 to 90 degree<br/>
* RC servo motor (such as MG90S) should be connected to GCube 1 & 2 for this example <br/>
<br/>						

### Example 8 (test.ts)
```blocks
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
```
<a href="https://makecode.microbit.org/S93202-21130-73675-67640">This example</a> shows<br/>
1. wait for the first GCube (GCube 0) is connected to Micro:bit <br/>
2. wait for the other two GCubes (GCube 1, GCube 2) are connected to GCube 0<br/>
3. when button 'A' or 'B' is pressed, set the rotation angle of GCube 0 and the speed of GCube 1 & 2<br/>
4. when button 'A+B' is pressed, stop all of the GCube's motor<br/>
5. when 'tilt left' event is occured, set dot-matrix of GCube 1 to "Left arrow icon" and set servo motor of GCube 3 to 45 degree<br/>
6. when 'tilt right' event is occured, set dot-matrix of GCube 1 to "Right arrow icon" and set servo motor of GCube 3 to 135 degree<br/>
7. when 'logo up' event is occured, start rolling dot-matrix image of GCube 1 & 2 <br/>
8. when 'logo down' event is occured, start shifting dot-matrix image of GCube 1 <br/>
* 8x8 dot-matrix should be connected to GCube 1 & 2 for this example <br/>
* RC servo motor (such as MG90S) should be connected to GCube 3 for this example <br/>
<br/>

<br/>
<br/>
<br/>
  
## API's of GCube

### sendGCube(xdata: any[])
	* Description: Sends serial data to a device referred to as "GCube."
	* Parameters:
	xdata (Array): An array containing data to be transmitted over serial.

### sendMatrixData(cn: number, t1: number, t2: number, t3: number, t4: number, t5: number, t6: number, t7: number, t8: number)
	* Description: Prepares and sends matrix data to a device.
	* Parameters:
	cn (Number): An identifier for the data.
	t1, t2, t3, t4, t5, t6, t7, t8 (Number): Numeric data for the matrix.

### startShiftingMatrixImage(cubeIndex: number)
	* Description: Initiates the shifting of a matrix image on the specified GCube.
	* Parameters:
	cubeIndex (Number): The index of the target GCube to display the shifting matrix image.

### startRollingMatrixImage(duration: number)
	* Description: Starts rolling a matrix image for a specified duration.
	* Parameters:
	duration (Number): The duration (in seconds) for which the matrix image should roll. Use 0 for continuous rolling.

### defaultRollingMatrixImage(dm: string, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string)
	* Description: Sets the default rolling display image for the 8x8 dot matrix of GCube.
	* Parameters:
	dm (String): Dummy index.
	t1, t2, t3, t4, t5, t6, t7, t8 (String): Image lines for the 8x8 dot matrix.

### setMatrixDisplay(cn: number, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string)
	* Description: Sets the matrix image of a specific GCube.
	* Parameters:
	cn (Number): The index of the target GCube.
	t1, t2, t3, t4, t5, t6, t7, t8 (String): Image lines for the 8x8 dot matrix.

### setAllGCubeServoMotorAngle(dm: string, a7: number, a6: number, a5: number, a4: number, a3: number, a2: number, a1: number, a0: number)
	* Description: Sets the angles of servo motors for all GCubes.
	* Parameters:
	dm (String): Dummy index.
	a7, a6, a5, a4, a3, a2, a1, a0 (Number): Servo motor angles for GCubes.

### setAGCubeServoAngle(cubeIndex: number, servoAngle: number)
	* Description: Sets a GCube's servo motor to a specific angle.
	* Parameters:
	cubeIndex (Number): The index of the target GCube.
	servoAngle (Number): The angle (in degrees) to set the servo motor to.

### setAllGCubeRotationAngle(dm: string, r3: number, r2: number, r1: number, r0: number)
	* Description: Sets the rotation angles of all GCube motors.
	* Parameters:
	dm (String): Dummy index.
	r3, r2, r1, r0 (Number): Rotation angles (in degrees) for Cube 3 or 7, Cube 2 or 6, Cube 1 or 5, and Cube 0 or 4, respectively.

### setAGCubeRotationAngle(cubeIndex: number, rotationAngle: number)
	* Description: Sets a GCube's motor to a specific rotation angle.
	* Parameters:
	cubeIndex (Number): The index of the target GCube.
	rotationAngle (Number): The rotation angle in degrees, in the range of -1000 to 1000.

### stopAllGCubeMotor()
	* Description: Stops all GCube motors.
	* Parameters: None.

### setAllGCubeSpeed(dm: string, s7: number, s6: number, s5: number, s4: number, s3: number, s2: number, s1: number, s0: number)
	* Description: Sets the speeds of all GCube motors.
	* Parameters:
	dm (String): Dummy index.
	s7, s6, s5, s4, s3, s2, s1, s0 (Number): Speed values for Cube 7, Cube 6, Cube 5, Cube 4, Cube 3, Cube 2, Cube 1, and Cube 0, respectively.

### setAGCubeSpeed(cubeIndex: number, motorSpeed: number)
	* Description: Sets a GCube's motor to a specific speed.
	* Parameters:
	cubeIndex (Number): The index of the target GCube.
	motorSpeed (Number): The motor speed value.

### waitAllGCubesConnect(cnumber: number)
	* Description: Waits for a specified number of GCubes to be connected before proceeding with the user's project.
	* Parameters:
	cnumber (Number): The desired number of GCubes to wait for.

### waitFirstGCubeConnect()
	* Description: Waits for the first GCube to be connected before proceeding with the user's project.
	* Parameters: None.



