## About Gcube

Gcube is a cube type module which include stepper motor, battery, sensors and BLE 5.0 cpu based board.
It is available to use dot-matrix, RC servo motor or various sensors with Gcube, because Gcube has general external sensor port.
With just 1 Gcube you are able to make robotics and more and more Gcubes you have, you can build any kind of robot.
We've released this extension for microbit users to use Gcube for robotics and IoT projects.

More information:
www.roborisen.com   qna@roborisen.com

[Manual-microbit-Gcube/PingPong] https://drive.google.com/file/d/1Cx2xfd_jyGv8ZZpOsOfL8Q2vWVdp0YYe <BR>
[Manual-microbit-Gcube/test.ts] https://drive.google.com/file/d/1KvSzr9H3UgrDJRcgs3GJok3t5EzW4rfu <BR>
[Movie-microbit-Gcube/PingPong] https://drive.google.com/file/d/1Nlr_0LPiVet9XcCz7VrC1GY5_dgytKP2 <BR>
[Material-Gcube/PingPong] https://drive.google.com/drive/folders/1fqJUBc3_YiFQwCtpSOFDAteLwlszzoH4 <BR>
[Movie-Gcube/PingPong] https://youtu.be/wTfnsPbgm3s

<br/>
<br/>

## How to connect Gcubes to microbit
* Step 1: Load program to microbit using this Gcube custom blocks
* Step 2: Attach microbit to Gcube using Gcube-Edge connector module
* Step 3: Turn on the Gcube of Step 2 
* Step 4: Click twice of the other Gcubes (to the number of Gcubes that user defined on user program at Step 1)
          (for dot-matrix application, you should attach dot matrix to Gcube in advance)
* Step 5: If all Gcubes are connected then the main mission of main routine of user program will be started

<br/>
<br/>

## Blocks of Gcube

### wait until the first Gcube is connected
```sig
gcube.waitFirstGcubeConnect(): void
```
This block is to wait until the first Gcube is connected to microbit (microbit is monitoring Gcube is turned on via serial data)

### wait until # Gcubes are connected
```sig
gcube.waitAllGcubesConnect(cnumber: number): void
```
This block is to wait until # (user define the Gcube number for their project) Gcubes are connected

### set motor speed to # of the Gcube #
```sig
gcube.setAGcubeSpeed(cubeIndex: number, motorSpeed: number): void
```
This block is set motor speed to # (-100~100, 100 is maximum speed i.e. 30rpm) of the Gcube #

### set all Gcube motor speed #...
```sig
gcube.setAllGcubeSpeed(s7: number, s6: number, s5: number, s4: number, s3: number, s2: number, s1: number, s0: number): void
```
This block is set all Gcube motor speed with the 8 argument numbers from Gcube 7 to Gcube 0

### stop all of the Gcube motors
```sig
gcube.stopAllGcubeMotor(): void
```
This block is stop all of the Gcube motors

### set rotation angle to # of the Gcube #
```sig
gcube.setAGcubeRotationAngle(cubeIndex: number, rotationAngle: number): void
```
This block is to set rotation angle to # (-10000 ~ 10000 in degrees) of the Gcube #

### set all Gcube rotation angle #...
```sig
gcube.setAllGcubeRotationAngle(r7: number, r6: number, r5: number, r4: number, r3: number, r2: number, r1: number, r0: number): void : void
```
This block is to set each Gcube's rotation angle with the 8 argument numbers from Gcube 7 to Gcube 0

### set servo motor angle to # of the Gcube #
```sig
gcube.setAGcubeServoAngle(cubeIndex: number, servoAngle: number): void
```
This block is to set servo motor angle to # (-10000 ~ 10000 in degrees) of the Gcube #

### set all Gcube servo motor angle #...
```sig
gcube.setAllGcubeServoMotorAngle(a7: number, a6: number, a5: number, a4: number, a3: number, a2: number, a1: number, a0: number): void
```
This block is to set each Gcube's servo motor rotation angle with the 8 argument numbers from Gcube 7 to Gcube 0

### set matrix image of the Gcube #
```sig
gcube.setMatrixDisplay(cn: number, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string): void
```
This block is to set 8x8 dot-matrix image of the Gcube #

### default rolling matrix image #...
```sig
gcube.defaultRollingMatrixImage(t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string): void
```
This block is to set default rolling 8x8 dot-matrix image with the 8 row image data

### start rolling matrix image for # seconds
```sig
gcube.startRollingMatrixImage(duration: number): void
```
This block is to start rolling 8x8 dot-matrix image from Gcube 0 ~ Gcube n for # seconds

### start shifting matrix image for the Gcube #
```sig
startShiftingMatrixImage(cubeIndex: number): void
```
This block is to start shifting 8x8 dot-matrix image from Gcube 0 ~ Gcube n for # seconds
Shifting direction is depends on the acceleration sensor data of microbit

<br/>
<br/>
<br/>

## Examples 

### Example 1
```blocks
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(3)
```
<a href="https://makecode.microbit.org/S52088-96748-89161-23790">This example</a> shows <br/>
1. wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. wait until the other two Gcubes (Gcube 1, Gcube 2) are connected to Gcube 0<br/>
3. then three Gcubes will be connected to microbit<br/>
<br/>

### Example 2
```blocks
input.onButtonPressed(Button.A, function () {
    gcube.defaultRollingMatrixImage(
    ":",
    "__0__0__0__0__0__0__0__0__",
    "__0__0__0__0__0__0__0__0__",
    "__0__0__0__1__1__0__0__0__",
    "__0__0__1__1__1__1__0__0__",
    "__0__0__1__1__1__1__0__0__",
    "__0__0__0__1__1__0__0__0__",
    "__0__0__0__0__0__0__0__0__",
    "__0__0__0__0__0__0__0__0__"
    )
})
input.onButtonPressed(Button.B, function () {
    gcube.startRollingMatrixImage(1000)
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(3)
```
<a href="https://makecode.microbit.org/S35219-78808-31549-03051">This example</a> shows<br/>
1. wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. wait until the other two Gcubes (Gcube 1, Gcube 2) are connected to Gcube 0<br/>
3. set rolling 8x8 dot-matrix image<br/>
4. start rolling 8x8 dot-matrix (attatched to Gcube 1 ... N) from Gcube 1 to Gcube 2<br/>
* 8x8 dot-matrix should be connected to Gcube 1 & 2 for this example <br/>
<br/>

### Example 3
```blocks
input.onButtonPressed(Button.A, function () {
    gcube.setMatrixDisplay(
    1,
    "__0__0__0__0__0__0__0__0__",
    "__0__0__0__0__0__0__0__0__",
    "__0__0__0__1__1__0__0__0__",
    "__0__0__1__0__0__1__0__0__",
    "__0__0__1__0__0__1__0__0__",
    "__0__0__0__1__1__0__0__0__",
    "__0__0__0__0__0__0__0__0__",
    "__0__0__0__0__0__0__0__0__"
    )
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(3)
```
<a href="https://makecode.microbit.org/S51633-60732-00552-64204">This example</a> shows<br/>
1. wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. wait until the other two Gcubes (Gcube 1, Gcube 2) are connected to Gcube 0<br/>
3. set 8x8 dot-matrix image of Gcube 1 (#: LED ON -: LED OFF)<br/>
* 8x8 dot-matrix should be connected to Gcube 1 & 2 for this example <br/>
<br/>						

### Example 4
```blocks
input.onButtonPressed(Button.A, function () {
    gcube.setAGcubeSpeed(1, 100)
    gcube.setAGcubeSpeed(2, 100)
})
input.onButtonPressed(Button.B, function () {
    gcube.stopAllGcubeMotor()
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(3)
```
<a href="https://makecode.microbit.org/S83314-90357-19040-82123">This example</a> shows<br/>
1. wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. wait until the other two Gcubes (Gcube 1, Gcube 2) are connected to Gcube 0<br/>
3. when button 'A' is pressed, set motor speed of Gcube 1 and Gcube 2 to 100 (-100~100, 100: maximum speed of the motor, i.e. 30rpm)<br/>
4. when button 'B' is pressed, stop all of the Gcube's motor (Gcube 0 ~ 2) <br/>
<br/>						

### Example 5
```blocks
input.onButtonPressed(Button.A, function () {
    gcube.setAGcubeRotationAngle(0, 180)
    gcube.setAGcubeRotationAngle(1, 180)
    gcube.setAGcubeRotationAngle(2, 180)
})
input.onButtonPressed(Button.B, function () {
    gcube.setAGcubeRotationAngle(0, -300)
    gcube.setAGcubeRotationAngle(1, -300)
    gcube.setAGcubeRotationAngle(2, -300)
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(3)
```
<a href="https://makecode.microbit.org/S48642-39369-42354-73859">This example</a> shows<br/>
1. wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. wait until the other two Gcubes (Gcube 1, Gcube 2) are connected to Gcube 0<br/>
3. when button 'A' is pressed, set motor rotation angle of Gcube 0 ~ 2 to 180 degree<br/>
4. when button 'B' is pressed, set motor rotation angle of Gcube 0 ~ 2 to -300 degree<br/>
<br/>						

### Example 6
```blocks
input.onButtonPressed(Button.A, function () {
    gcube.setAllGcubeRotationAngle(
    180,
    180,
    180,
    0,
    0,
    0,
    0,
    0
    )
})
input.onButtonPressed(Button.B, function () {
    gcube.setAllGcubeRotationAngle(
    -300,
    -300,
    -300,
    0,
    0,
    0,
    0,
    0
    )
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(3)
```
<a href="https://makecode.microbit.org/S10341-71019-59343-30137">This example</a> shows<br/>
1. wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. wait until the other two Gcubes (Gcube 1, Gcube 2) are connected to Gcube 0<br/>
3. when button 'A' is pressed, set motor rotation angle of Gcube 0~2 to 180 degree<br/>
4. when button 'B' is pressed, set motor rotation angle of Gcube 0~2 to -300 degree<br/>
<br/>						

### Example 7
```blocks
input.onButtonPressed(Button.A, function () {
    gcube.setAGcubeServoAngle(1, 30)
})
input.onButtonPressed(Button.AB, function () {
    gcube.setAGcubeServoAngle(1, 90)
    gcube.setAGcubeServoAngle(2, 90)
})
input.onButtonPressed(Button.B, function () {
    gcube.setAGcubeServoAngle(2, 45)
})
gcube.waitFirstGcubeConnect()
gcube.waitAllGcubesConnect(3)
```
<a href="https://makecode.microbit.org/S14821-35391-54690-59634">This example</a> shows<br/>
1. wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. wait until the other two Gcubes (Gcube 1, Gcube 2) are connected to Gcube 0<br/>
3. when button 'A' is pressed, set servor motor angle of Gcube 1 to 30 degree<br/>
4. when button 'B' is pressed, set servor motor angle of Gcube 2 to 45 degree<br/>
5. when button 'A+B' is pressed, set servor motor angle of Gcube 1~2 to 90 degree<br/>
* RC servo motor (such as MG90S) should be connected to Gcube 1 & 2 for this example <br/>
<br/>						

### Example 8 (test.ts)
```blocks
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

```
<a href="https://makecode.microbit.org/S93202-21130-73675-67640">This example</a> shows<br/> <br/>
[Preparation & connection] <br/>
1. Make Autocar, Mono robot with Gcube 0, 1 ,2 and links <br/>
2. Attach microbit to Gcube 0 with Edge connector <br/>
3. Plug Dot matrix into Gcube 3 <br/>
4. Turn on Gcube 0 by clicking yellow button on the cube <br/>
5. Double click yellow button of Gcube 1 to 3 in order to connect to Gcube 0 <br/>
6. Run make code blocks to control PingPong robot and Gcubes
<br/>
[Blocks-Connection] <br/>
1. Wait until the first Gcube (Gcube 0) is connected to microbit <br/>
2. Wait until the 3 Gcubes (Gcube 1~3) is connected to Gcube 0 <br/>
[Blocks-motor control] <br/>
1. Button A : Move forward Mono and turn right Gcube 3’s motor <br/>
2. Button B : Move backward Mono and turn left Gcube 3’s motor <br/>
3. Button A+B : stop all motors 
<br/>
<br/>
[Blocks-sensor control] <br/>
1. Tilt Left <br/>
  * Control servo motor of Mono to turn left. <br/>
  * Display Left-arrow image on the dot-matrix of Gcube 3 <br/>
2. Tilt Right <br/>
  * Control servo motor of Mono to turn right. <br/>
  * Display Right-arrow image on the dot-matrix of Gcube 3
<br/>
<br/>
[Blocks-robot control] <br/>
1. Cover the proximity sensor of the Gcube 3 with a finger, and then move the Gcube 3 forward, backward, left, and right. <br/>
2. Read the gyro sensor values of the Gcube 3 from the microbit. <br/>
3. The microbit controls the motors of the Autocar (Gcube 0, Gcube 1) based on these gyro sensor values. <br/>

<br/>
<br/>


## This is a limitation when using microbit-GCube.

1. USB serial communication cannot be used because there are P1 and P2 in serial communication between the microbit and GCube. <BR>
2. The code uploaded to the microbit communicates with GCube and executes the project without being connected to a PC. <BR>
3. When using the GCube connection, do not use any other external sensors except the microbit's basic sensor. <BR>

<br/>
<br/>
<br/> 


## API's of Gcube

### sendGcube(xdata: any[])
	* Description: Sends serial data to a device referred to as "gcube."
	* Parameters:
	xdata (Array): An array containing data to be transmitted over serial.

### sendMatrixImageData(cn: number, t1: number, t2: number, t3: number, t4: number, t5: number, t6: number, t7: number, t8: number)
	* Description: Prepares and sends matrix data to a device.
	* Parameters:
	cn (Number): An identifier for the data.
	t1, t2, t3, t4, t5, t6, t7, t8 (Number): Numeric data for the matrix.

### startShiftingMatrixImage(cubeIndex: number)
	* Description: Initiates the shifting of a matrix image on the specified gcube.
	* Parameters:
	cubeIndex (Number): The index of the target Gcube to display the shifting matrix image.

### startRollingMatrixImage(duration: number)
	* Description: Starts rolling a matrix image for a specified duration.
	* Parameters:
	duration (Number): The duration (in seconds) for which the matrix image should roll. Use 0 for continuous rolling.

### defaultRollingMatrixImage(t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string)
	* Description: Sets the default rolling display image for the 8x8 dot matrix of gcube.
	* Parameters:
	dm (String): Dummy index.
	t1, t2, t3, t4, t5, t6, t7, t8 (String): Image lines for the 8x8 dot matrix.

### setMatrixDisplay(cn: number, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string)
	* Description: Sets the matrix image of a specific gcube.
	* Parameters:
	cn (Number): The index of the target gcube.
	t1, t2, t3, t4, t5, t6, t7, t8 (String): Image lines for the 8x8 dot matrix.

### setAllGcubeServoMotorAngle(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number)
	* Description: Sets the angles of servo motors for all Gcubes.
	* Parameters:
	dm (String): Dummy index.
	a7, a6, a5, a4, a3, a2, a1, a0 (Number): Servo motor angles for Gcubes.

### setAGcubeServoAngle(cubeIndex: number, servoAngle: number)
	* Description: Sets a Gcube's servo motor to a specific angle.
	* Parameters:
	cubeIndex (Number): The index of the target gcube.
	servoAngle (Number): The angle (in degrees) to set the servo motor to.

### setAllGcubeRotationAngle(r3: number, r2: number, r1: number, r0: number)
	* Description: Sets the rotation angles of all Gcube motors.
	* Parameters:
	dm (String): Dummy index.
	r3, r2, r1, r0 (Number): Rotation angles (in degrees) for Cube 3 or 7, Cube 2 or 6, Cube 1 or 5, and Cube 0 or 4, respectively.

### setAGcubeRotationAngle(cubeIndex: number, rotationAngle: number)
	* Description: Sets a Gcube's motor to a specific rotation angle.
	* Parameters:
	cubeIndex (Number): The index of the target gcube.
	rotationAngle (Number): The rotation angle in degrees, in the range of -1000 to 1000.

### stopAllGcubeMotor()
	* Description: Stops all Gcube motors.
	* Parameters: None.

### setAllGcubeSpeed(s0: number, s1: number, s2: number, s3: number, s4: number, s5: number, s6: number, s7: number)
	* Description: Sets the speeds of all Gcube motors.
	* Parameters:
	dm (String): Dummy index.
	s7, s6, s5, s4, s3, s2, s1, s0 (Number): Speed values for Cube 7, Cube 6, Cube 5, Cube 4, Cube 3, Cube 2, Cube 1, and Cube 0, respectively.

### setAGcubeSpeed(cubeIndex: number, motorSpeed: number)
	* Description: Sets a Gcube's motor to a specific speed.
	* Parameters:
	cubeIndex (Number): The index of the target gcube.
	motorSpeed (Number): The motor speed value.

### waitAllGcubesConnect(cnumber: number)
	* Description: Waits for a specified number of Gcubes to be connected before proceeding with the user's project.
	* Parameters:
	cnumber (Number): The desired number of Gcubes to wait until.

### waitFirstGcubeConnect()
	* Description: Waits for the first Gcube to be connected before proceeding with the user's project.
	* Parameters: None.
