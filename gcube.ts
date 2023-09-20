

function sendGCube(xdata: any[]) { //Send UART data to GCube
    let sendData = pins.createBuffer(10);
    for (let i = 0; i <= 9; i++) {
        sendData.setNumber(NumberFormat.UInt8LE, i, xdata[i]);
    }
    serial.writeBuffer(sendData)
    pause(50) //Wait for the next command
}

function invValue(a: number) {
    return a / 16 + (a & 0x0F) * 16
}

function matrixLine(aaa: string) {
    let tMatrix = 0
    for (let i = 0; i < 8; i++) { if (aaa.charAt(3 * i + 2) == '#') tMatrix = tMatrix | (1 << (7 - i)) }
    return tMatrix
}

function sendMatrixData(cn: number, t1: number, t2: number, t3: number, t4: number, t5: number, t6: number, t7: number, t8: number): void {
    numData[2] = t1
    numData[3] = t2
    numData[4] = t3
    numData[5] = t4
    numData[6] = t5
    numData[7] = t6
    numData[8] = t7
    numData[9] = t8

    let temp = cn - 1;
    numData[0] = 0x51 + temp
    numData[1] = invValue(0x51 + temp)
    sendGCube(numData)
}


let numData: number[] = []
let rollingImage: string[] = []
let rowData: Buffer = null
let connectStage = 0
let connectedCubeNumber = 0


serial.redirect(SerialPin.P1, SerialPin.P0, 115200)
serial.setRxBufferSize(10)
serial.setTxBufferSize(10)


/**
 * Custom blocks
 */
//% weight=100 color=#111111 icon="\uf0fe"
namespace GCube {

    /**
     * start shifting matrix image along the acceleration data of Micro:bit
     * @param cubeIndex Cube index number eg:1
     */
    //% block="start shifting matrix image for the GCube $cubeIndex"
    export function startShiftingMatrixImage(cubeIndex: number): void {
        if (connectStage < 2) return

        let roll: number[] = []

        for (let i = 0; i < 8 * 8; i++) roll[i] = 0

        let xPosition = 0
        let yPosition = 0

        //infinite loop for stop_rolling_matrix_image
        let temp = connectedCubeNumber - 1; // the number of dot matrix plugged GCubes

        while (1) {

            xPosition = input.acceleration(Dimension.X) * 4 / 1024
            yPosition = input.acceleration(Dimension.Y) * 4 / 1024

            if (cubeIndex > 0) {
                for (let i = 0; i < 8; i++) roll[i] = 0
                for (let y = yPosition; y < 8; y++) {
                    if (y >= 0) {
                        if (xPosition >= 0)
                            roll[y] = matrixLine(rollingImage[Math.trunc(y - yPosition)]) >> Math.trunc(xPosition)
                        else
                            roll[y] = matrixLine(rollingImage[Math.trunc(y - yPosition)]) << Math.trunc(-1 * xPosition)
                    }
                }

                sendMatrixData(cubeIndex, roll[0], roll[1], roll[2], roll[3], roll[4], roll[5], roll[6], roll[7])
            } else {
                for (let i = 0; i < 8; i++) roll[i] = 0
                for (let y = yPosition; y < 8; y++) {
                    if (y >= 0) {
                        if (xPosition >= 0)
                            roll[y] = matrixLine(rollingImage[Math.trunc(y - yPosition)]) >> Math.trunc(xPosition)
                        else
                            roll[y] = matrixLine(rollingImage[Math.trunc(y - yPosition)]) << Math.trunc(-1 * xPosition)
                    }
                }

                for (let c = 0; c < temp; c++) {
                    sendMatrixData(c + 1, roll[0], roll[1], roll[2], roll[3], roll[4], roll[5], roll[6], roll[7])
                }

            }
        }
    }


    /**
     * start rolling matrix image
     * @param duration time(rotation number) eg:1000
     */
    //% block="start rolling matrix image for $duration seconds"
    export function startRollingMatrixImage(duration: number): void {
        if (connectStage < 2) return

        let roll: number[] = []

        for (let i = 0; i < 8 * 8; i++) roll[i] = 0

        let currentRollIndex = 0
        let durIndex = 0

        //infinite loop for stop_rolling_matrix_image
        let temp = connectedCubeNumber - 1; // the number of dot matrix plugged GCubes
        let totalLine = temp * 8
        let rollingFlag = true

        while (rollingFlag) {
            for (let i = 0; i < totalLine; i++) roll[i] = 0

            for (let s = currentRollIndex; s < currentRollIndex + 8; s++) {
                roll[s % totalLine] = matrixLine(rollingImage[s - currentRollIndex])
            }
            currentRollIndex++;
            currentRollIndex = currentRollIndex % totalLine

            for (let i = 0; i < temp; i++) {
                sendMatrixData(i + 1, roll[8 * i + 0], roll[8 * i + 1], roll[8 * i + 2], roll[8 * i + 3], roll[8 * i + 4], roll[8 * i + 5], roll[8 * i + 6], roll[8 * i + 7])
            }

            if (duration != 0 && durIndex >= duration * 20) rollingFlag = false // 50msed * 20 = 1sec
        }
    }


    /**
     * set default rolling display image of 8x8 dot Matrix of GCube
     * @param dm Dummy index, eg: A
     * @param t1 image line, eg: "__-__-__-__-__-__-__-__-__"
     * @param t2 image line, eg: "__-__-__-__-__-__-__-__-__"
     * @param t3 image line, eg: "__-__-__-__#__#__-__-__-__"
     * @param t4 image line, eg: "__-__-__#__#__#__#__-__-__"
     * @param t5 image line, eg: "__-__-__#__#__#__#__-__-__"
     * @param t6 image line, eg: "__-__-__-__#__#__-__-__-__"
     * @param t7 image line, eg: "__-__-__-__-__-__-__-__-__"
     * @param t8 image line, eg: "__-__-__-__-__-__-__-__-__"
     */
    //% block
    export function defaultRollingMatrixImage(dm: string, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string): void {
        rollingImage[0] = t1
        rollingImage[1] = t2
        rollingImage[2] = t3
        rollingImage[3] = t4
        rollingImage[4] = t5
        rollingImage[5] = t6
        rollingImage[6] = t7
        rollingImage[7] = t8
    }


    /**
     * set display image for 8x8 dot matrix of GCube from GCube 1 ~ GCube8
     * @param cn GCube index, eg: 1
     * @param t1 image line, eg: "__-__-__-__-__-__-__-__-__"
     * @param t2 image line, eg: "__-__-__-__-__-__-__-__-__"
     * @param t3 image line, eg: "__-__-__-__#__#__-__-__-__"
     * @param t4 image line, eg: "__-__-__#__-__-__#__-__-__"
     * @param t5 image line, eg: "__-__-__#__-__-__#__-__-__"
     * @param t6 image line, eg: "__-__-__-__#__#__-__-__-__"
     * @param t7 image line, eg: "__-__-__-__-__-__-__-__-__"
     * @param t8 image line, eg: "__-__-__-__-__-__-__-__-__"
     */
    //% block="set matrix'image of the GCube $cn $t1 $t2 $t3 $t4 $t5 $t6 $t7 $t8"
    export function setMatrixDisplay(cn: number, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string): void {
        if (connectStage == 2) {
            sendMatrixData(cn, matrixLine(t1), matrixLine(t2), matrixLine(t3), matrixLine(t4), matrixLine(t5), matrixLine(t6), matrixLine(t7), matrixLine(t8))
        }
    }


    /**
     * set all GCube's servo motor to each angle
     * @param dm Dummy index, eg: A
     * @param a7 angle of Cube 7 servo, eg: 0
     * @param a6 angle of Cube 6 servo, eg: 0
     * @param a5 angle of Cube 5 servo, eg: 0
     * @param a4 angle of Cube 4 servo, eg: 0
     * @param a3 angle of Cube 3 servo, eg: 0
     * @param a2 angle of Cube 2 servo, eg: 0
     * @param a1 angle of Cube 1 servo, eg: 0
     * @param a0 angle of Cube 0 servo, eg: 0
     */
    //% block
    export function setAllGCubeServoMotorAngle(dm: string, a7: number, a6: number, a5: number, a4: number, a3: number, a2: number, a1: number, a0: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            numData = [0x41 + temp, invValue(0x40 + temp), a7, a6, a5, a4, a3, a2, a1, a0]
            sendGCube(numData)
        }
    }


    /**
     * set a GCube's servo motor to an angle
     * @param cubeIndex GCube number, eg: 1
     * @param servoAngle GCube number, eg: 90
     */
    //% block="set servo motor angle to $servoAngle of the GCube $cubeIndex"
    export function setAGCubeServoAngle(cubeIndex: number, servoAngle: number): void {
        if (connectStage == 2 && cubeIndex < connectedCubeNumber) {
            numData = [0x40, invValue(0x40), cubeIndex, servoAngle, 0, 0, 0, 0, 0, 0]
            sendGCube(numData)
        }
    }

    /**
     * set all GCube's motor to each rotation angle
     * @param dm Dummy index, eg: A
     * @param r3 rotation angle of Cube 3 or 7, eg: 90
     * @param r2 angle of Cube 2 or 6, eg: 90
     * @param r1 angle of Cube 1 or 5, eg: 90
     * @param r0 angle of Cube 0 or 4, eg: 90
     */
    //% block
    export function setAllGCubeRotationAngle(dm: string, r3: number, r2: number, r1: number, r0: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            r3 = 100 * r3 / 18;
            r2 = 100 * r2 / 18;
            r1 = 100 * r1 / 18;
            r0 = 100 * r0 / 18;

            numData = [0x39 + temp, invValue(0x39 + temp), (r3 >> 8) & 0xFF, r3 & 0xFF, (r2 >> 8) & 0xFF, r2 & 0xFF, (r1 >> 8) & 0xFF, r1 & 0xFF, (r0 >> 8) & 0xFF, r0 & 0xFF]
            sendGCube(numData);
        }
    }


    /**
     * set a GCube's motor to a rotation angle
     * @param cubeIndex GCube number(0, 1, ...), eg: 1
     * @param rotationAngle GCube number(-1000~1000), eg: 90
     */
    //% block="set rotation angle to $rotationAngle of the GCube $cubeIndex"
    export function setAGCubeRotationAngle(cubeIndex: number, rotationAngle: number): void {
        if (connectStage == 2 && cubeIndex < connectedCubeNumber) {
            rotationAngle = 100 * rotationAngle / 18
            numData = [0x38, invValue(0x38), cubeIndex, (rotationAngle >> 8) & 0xFF, rotationAngle & 0xFF, 0, 0, 0, 0, 0]
            sendGCube(numData)
        }
    }


    /**
     * stop all of the GCube's motor
     */
    //% block="stop all of the GCube's motor"
    export function stopAllGCubeMotor(): void {
        if (connectStage == 2) {
            for (let i = 0; i < connectedCubeNumber; i++) {
                numData = [0x30, invValue(0x30), i, 0, 0, 0, 0, 0, 0, 0]
                sendGCube(numData)
            }
        }
    }


    /**
     * set all GCube's motor to each speed
     * @param dm Dummy index, eg: A
     * @param s7 speed of Cube 7, eg: 0
     * @param s6 speed of Cube 6, eg: 0
     * @param s5 speed of Cube 5, eg: 0
     * @param s4 speed of Cube 4, eg: 0
     * @param s3 speed of Cube 3, eg: 0
     * @param s2 speed of Cube 2, eg: 0
     * @param s1 speed of Cube 1, eg: 0
     * @param s0 speed of Cube 0, eg: 0
     */
    //% block
    export function setAllGCubeSpeed(dm: string, s7: number, s6: number, s5: number, s4: number, s3: number, s2: number, s1: number, s0: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            numData = [0x31 + temp, invValue(0x30 + temp), s7, s6, s5, s4, s3, s2, s1, s0]
            sendGCube(numData)
        }
    }


    /**
     * set a GCube's motor to a speed
     * @param cubeIndex GCube number, eg: 1
     * @param motorSpeed GCube number, eg: 100
     */
    //% block="set motor speed to $motorSpeed of the GCube $cubeIndex"
    export function setAGCubeSpeed(cubeIndex: number, motorSpeed: number): void {
        if (connectStage == 2 && cubeIndex < connectedCubeNumber) {
            numData = [0x30, invValue(0x30), cubeIndex, motorSpeed, 0, 0, 0, 0, 0, 0]
            sendGCube(numData)
        }
    }


    /**
     * wait for all GCubes are connected for user's project
     * @param cnumber GCube number, eg: 2
     */
    //% block="wait for $cnumber GCubes are connected"
    export function waitAllGCubesConnect(cnumber: number): void {
        if (connectStage == 1) {
            while (1) {
                pause(1000)
                numData = [0x21, invValue(0x21), 0, 0, 0, 0, 0, 0, 0, 0]
                sendGCube(numData)

                rowData = serial.readBuffer(3)
                if (rowData.length == 3) {
                    if (rowData[0] == 0x21 && rowData[1] == 0) {
                        connectedCubeNumber = rowData[2];
                        if (connectedCubeNumber >= cnumber) {
                            led.plot(1, 1)
                            led.plot(2, 1)
                            led.plot(3, 1)
                            led.plot(1, 2)
                            led.plot(3, 2)
                            led.plot(1, 3)
                            led.plot(2, 3)
                            led.plot(3, 3)
                            connectStage = 2
                            break
                        }
                    }
                }
            }
        }
    }

    /**
     * wait for first GCube is connected
     */
    //% block="wait for the first GCube is connected"
    export function waitFirstGCubeConnect(): void {
        if (connectStage == 0) {
            rowData = serial.readBuffer(3)
            if (rowData.length == 3) {
                if (rowData[0] == 16 && rowData[1] == 0 && rowData[2] == 0) {
                    led.plot(2, 2)
                    pause(20);
                    numData = [0x10, invValue(0x10), 0, 0, 0, 112, 0, 0, 0, 0]
                    sendGCube(numData)
                    connectStage = 1;
                }
            }
        }
    }


}
