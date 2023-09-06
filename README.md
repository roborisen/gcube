## About GCube

GCube is a cube type module which include stepper motor, battery, sensors and BLE 5.0 cpu based board.
With just 1 GCube you are able to make robotics and more and more GCubes you have, you can build any kind of robot.
We've released this extension for Micro:bit users to use GCube for robotics and IoT projects.

More information:
www.roborisen.com   qna@roborisen.com

https://www.youtube.com/watch?v=7Jo-E6HqMLE&list=PLTuN0ch4ELT2Z2eEUd5Rg8uWnCpc2gXtN


## How to connect Micro:bit to GCube
* Step 1: Load program to Micro:bit using this GCube custom blocks
* Step 2: Attach Micro:bit to GCube using GCube-Edge connector module
* Step 3: Turn on the GCube of Step 2 (for dot-matrix application, you should attach dot matrix to GCube in advance)
* Step 4: Click twice of the other GCubes (to defined number at Step 1 user program)
* Step 5: If all GCubes are connected then the main mission of user program will be started


## Micro:bit gcube block URL

이 저장소는 MakeCode에서 **확장**으로 추가될 수 있습니다.

* [https://makecode.microbit.org/](https://makecode.microbit.org/) 열기
* **새로운 프로젝트**에서 클릭
* 톱니바퀴 모양 메뉴에서 **확장**을 클릭합니다
* **https://github.com/roborisen/gcube**으로 검색하고 가져오기



#### 메타데이터(검색, 렌더링에 사용)

* for PXT/microbit/GCube/robot
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>



## Example project
<pre><code>
input.onButtonPressed(Button.A, function () {
    gCube.setAGcubeSpeed(0, 100)
    gCube.setAGcubeSpeed(1, 100)
})
input.onButtonPressed(Button.AB, function () {
    gCube.startShiftingMatrixImage(0)
})
input.onButtonPressed(Button.B, function () {
    gCube.stopAllGcubeMotor()
})
gCube.waitFirstGcubeConnect()
gCube.waitAllGcubesConnect(3)
gCube.defaultRollingMatrixImage(
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
basic.forever(function () {
	
})

</code></pre>


## API's for GCube

### sendGcube(xdata: any[])
	* Description: gCube 모듈에 데이터를 보내는 입니다. 시리얼 통신을 사용하여 데이터를 전송합니다.
	* Parameter:
	xdata: any[]: 전송할 데이터를 포함하는 배열입니다.

### sendMatrixData(cn: number, t1: number, t2: number, t3: number, t4: number, t5: number, t6: number, t7: number, t8: number)
	* Description: gCube 모듈에 매트릭스 데이터를 전송하는 입니다. 이 를 사용하여 각각의 GCube 모듈에 매트릭스 데이터를 보낼 수 있습니다.
	* Parameter:
	cn: number: GCube 모듈의 인덱스 번호입니다.
	t1, t2, t3, t4, t5, t6, t7, t8: 각각의 매트릭스 라인에 해당하는 숫자입니다.

### startShiftingMatrixImage(cubeIndex: number) 
	* Description: GCube 모듈의 매트릭스 이미지를 좌우로 이동시킵니다.
	* Parameter:
	cubeIndex: GCube 모듈의 인덱스 번호로, 이미 연결된 모듈 중 어떤 모듈을 제어할 것인지 지정합니다.

### startRollingMatrixImage(duration: number) 
	* Description: GCube 모듈의 매트릭스 이미지를 일정 시간 동안 좌우로 스크롤합니다.
	* Parameter:
	duration: 매트릭스 굴리는 시간(회전 횟수)을 지정합니다.

### defaultRollingMatrixImage(dm: string, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string) 
	* Description: GCube 모듈의 매트릭스 이미지를 설정합니다. 이 를 사용하여 기본 롤링 이미지를 설정할 수 있습니다.
	* Parameter:
	dm: Dummy data (A 등)
	t1 ~ t8: 8x8 매트릭스 이미지의 각 라인을 나타내는 문자열입니다.

### setMatrixDisplay(cn: number, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string) 
	* Description: 특정 GCube 모듈에 매트릭스 이미지를 설정합니다.
	* Parameter:
	cn: GCube 모듈의 인덱스 번호
	t1 ~ t8: 8x8 매트릭스 이미지의 각 라인을 나타내는 문자열입니다.


### setAllGcubeServoMotorAngle(dm: string, a7: number, a6: number, a5: number, a4: number, a3: number, a2: number, a1: number, a0: number) 
	* Description: 모든 gCube 모듈의 서보 모터 각도를 설정합니다.
	* Parameter:
	dm: Dummy data (A 등)
	a7 ~ a0: 각각 Cube 7에서 Cube 0까지의 서보 모터 각도를 설정합니다.

### setAGcubeServoAngle(cubeIndex: number, servoAngle: number) 
	* Description: 특정 gCube 모듈의 서보 모터 각도를 설정합니다.
	* Parameter:
	cubeIndex: 제어할 gCube 모듈의 인덱스 번호
	servoAngle: 서보 모터의 각도를 설정합니다.

### setAllGcubeRotationAngle(dm: string, r3: number, r2: number, r1: number, r0: number) 
	* Description: 모든 gCube 모듈의 모터 회전 각도를 설정합니다.
	* Parameter:
	dm: Dummy data (A 등)
	r3 ~ r0: 각각 Cube 3 또는 7, Cube 2 또는 6, Cube 1 또는 5, Cube 0 또는 4의 모터 회전 각도를 설정합니다.

### setAGcubeRotationAngle(cubeIndex: number, rotationAngle: number) 
	* Description: 특정 gCube 모듈의 모터 회전 각도를 설정합니다.
	* Parameter:
	cubeIndex: 제어할 gCube 모듈의 인덱스 번호
	rotationAngle: 모터의 회전 각도를 설정합니다.

### stopAllGcubeMotor() 
	* Description: 모든 gCube 모듈의 모터를 정지시킵니니다.


### setAllGcubeSpeed(dm: string, s7: number, s6: number, s5: number, s4: number, s3: number, s2: number, s1: number, s0: number) 
	* Description: 모든 gCube 모듈의 모터 속도를 설정합니다.
	* Parameter:
	dm: Dummy data (A 등)
	s7 ~ s0: 각각 Cube 7에서 Cube 0까지의 모터 속도를 설정합니다.

### setAGcubeSpeed(cubeIndex: number, motorSpeed: number) 
	* Description: 특정 gCube 모듈의 모터 속도를 설정합니다.
	* Parameter:
	cubeIndex: 제어할 gCube 모듈의 인덱스 번호
	motorSpeed: 모터의 속도를 설정합니다.

### waitAllGcubesConnect(cnumber: number) 
	* Description: 지정된 개수의 gCube 모듈이 연결될 때까지 대기하는 입니다. 지정된 개수 이상의 gCube 모듈이 연결되면 LED 표시로 알려줍니다.
	* Parameter:
	cnumber: 대기할 gCube 모듈의 개수를 지정합니다.

### waitFirstGcubeConnect() 
	* Description: 첫 번째 gCube 모듈이 연결될 때까지 대기하는 입니다. 첫 번째 gCube 모듈이 연결되면 LED 표시로 알려줍니다.


