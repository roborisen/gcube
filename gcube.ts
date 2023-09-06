
/**
* 이 파일을 사용해, 만든 함수와 블록들을 정의해두세요.
* 다음에서 더 살펴보기: https://makecode.microbit.org/blocks/custom
*/

function sendGcube(xdata: any[]) {
    let send_data = pins.createBuffer(10);
    for (let i = 0; i <= 9; i++) {
        send_data.setNumber(NumberFormat.UInt8LE, i, xdata[i]);
    }
    serial.writeBuffer(send_data)
    pause(50) //Wait for the next command
}

function invValue(a: number) {
    return a / 16 + (a & 0x0F) * 16
}

function matrixLine(aaa: string) {
    let t_matrix = 0
    for (let i = 0; i < 8; i++) { if (aaa.charAt(3 * i + 2) == '#') t_matrix = t_matrix | (1 << (7 - i)) }
    return t_matrix
}

function sendMatrixData(cn: number, t1: number, t2: number, t3: number, t4: number, t5: number, t6: number, t7: number, t8: number): void {
    num_data[2] = t1
    num_data[3] = t2
    num_data[4] = t3
    num_data[5] = t4
    num_data[6] = t5
    num_data[7] = t6
    num_data[8] = t7
    num_data[9] = t8

    let temp = cn - 1;
    num_data[0] = 0x51 + temp
    num_data[1] = invValue(0x51 + temp)
    sendGcube(num_data)
}

function isValidMatrix(roll: number[], ii: number) {
    let test = 0
    for (let s = ii * 8; s < ii * 8 + 8; s++) {
        test += roll[s]
    }
    return test
}

let num_data: number[] = []
let rolling_image: string[] = []
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
namespace gCube {

    /**
     * TODO: start shifting matrix image
     * @param CubeIndex Cube index number eg:1
     */
    //% block="start shifting matrix image for the GCube $CubeIndex"
    export function startShiftingMatrixImage(CubeIndex: number): void {
        if (connectStage < 2) return

        let roll: number[] = []

        for (let i = 0; i < 8 * 8; i++) roll[i] = 0

        let x_position = 0
        let y_position = 0

        //infinite loop for stop_rolling_matrix_image
        let temp = connectedCubeNumber - 1; // the number of dot matrix plugged GCubes

        while (1) {

            x_position = input.acceleration(Dimension.X) * 4 / 1024
            y_position = input.acceleration(Dimension.Y) * 4 / 1024

            if (CubeIndex > 0) {
                for (let i = 0; i < 8; i++) roll[i] = 0
                for (let y = y_position; y < 8; y++) {
                    if (y >= 0) {
                        if (x_position >= 0)
                            roll[y] = matrixLine(rolling_image[Math.trunc(y - y_position)]) >> Math.trunc(x_position)
                        else
                            roll[y] = matrixLine(rolling_image[Math.trunc(y - y_position)]) << Math.trunc(-1 * x_position)
                    }
                }

                sendMatrixData(CubeIndex, roll[0], roll[1], roll[2], roll[3], roll[4], roll[5], roll[6], roll[7])
            } else {
                for (let i = 0; i < 8; i++) roll[i] = 0
                for (let y = y_position; y < 8; y++) {
                    if (y >= 0) {
                        if (x_position >= 0)
                            roll[y] = matrixLine(rolling_image[Math.trunc(y - y_position)]) >> Math.trunc(x_position)
                        else
                            roll[y] = matrixLine(rolling_image[Math.trunc(y - y_position)]) << Math.trunc(-1 * x_position)
                    }
                }

                for (let c = 0; c < temp; c++) {
                    sendMatrixData(c + 1, roll[0], roll[1], roll[2], roll[3], roll[4], roll[5], roll[6], roll[7])
                }

            }
        }
    }


    /**
     * TODO: start rolling matrix image
     * @param duration time(rotation number) eg:1000
     */
    //% block="start rolling matrix image for $duration seconds"
    export function startRollingMatrixImage(duration: number): void {
        if (connectStage < 2) return

        let roll: number[] = []

        for (let i = 0; i < 8 * 8; i++) roll[i] = 0

        let current_roll_index = 0
        let dur_index = 0

        //infinite loop for stop_rolling_matrix_image
        let temp = connectedCubeNumber - 1; // the number of dot matrix plugged GCubes
        let total_line = temp * 8
        let rolling_flag = true

        while (rolling_flag) {
            for (let i = 0; i < total_line; i++) roll[i] = 0

            for (let s = current_roll_index; s < current_roll_index + 8; s++) {
                roll[s % total_line] = matrixLine(rolling_image[s - current_roll_index])
            }
            current_roll_index++;
            current_roll_index = current_roll_index % total_line

            for (let i = 0; i < temp; i++) {
                sendMatrixData(i + 1, roll[8 * i + 0], roll[8 * i + 1], roll[8 * i + 2], roll[8 * i + 3], roll[8 * i + 4], roll[8 * i + 5], roll[8 * i + 6], roll[8 * i + 7])
            }

            if (duration != 0 && dur_index >= duration * 20) rolling_flag = false // 50msed * 20 = 1sec
        }
    }


    /**
     * TODO: set default rolling display image of dot Matrix 8x8 of GCube
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
        rolling_image[0] = t1
        rolling_image[1] = t2
        rolling_image[2] = t3
        rolling_image[3] = t4
        rolling_image[4] = t5
        rolling_image[5] = t6
        rolling_image[6] = t7
        rolling_image[7] = t8
    }


    /**
     * TODO: set display image for dot matrix 8x8 of GCube from GCube 1 ~ GCube8
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
     * TODO: set all GCube's servo motor angle
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
    export function setAllGcubeServoMotorAngle(dm: string, a7: number, a6: number, a5: number, a4: number, a3: number, a2: number, a1: number, a0: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            num_data = [0x41 + temp, invValue(0x40 + temp), a7, a6, a5, a4, a3, a2, a1, a0]
            sendGcube(num_data)
        }
    }


    /**
     * TODO: set a GCube's servo motor angle
     * @param CubeIndex GCube number, eg: 1
     * @param ServoAngle GCube number, eg: 90
     */
    //% block="set servo motor angle to $ServoAngle of the GCube $CubeIndex"
    export function setAGcubeServoAngle(CubeIndex: number, ServoAngle: number): void {
        if (connectStage == 2 && CubeIndex < connectedCubeNumber) {
            num_data = [0x40, invValue(0x40), CubeIndex, ServoAngle, 0, 0, 0, 0, 0, 0]
            sendGcube(num_data)
        }
    }

    /**
     * TODO: set all GCube's motor rotation angle
     * @param dm Dummy index, eg: A
     * @param r3 rotation angle of Cube 3 or 7, eg: 90
     * @param r2 angle of Cube 2 or 6, eg: 90
     * @param r1 angle of Cube 1 or 5, eg: 90
     * @param r0 angle of Cube 0 or 4, eg: 90
     */
    //% block
    export function setAllGcubeRotationAngle(dm: string, r3: number, r2: number, r1: number, r0: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            num_data = [0x39 + temp, invValue(0x39 + temp), (r3 >> 8) & 0xFF, r3 & 0xFF, (r2 >> 8) & 0xFF, r2 & 0xFF, (r1 >> 8) & 0xFF, r1 & 0xFF, (r0 >> 8) & 0xFF, r0 & 0xFF]
            sendGcube(num_data)
        }
    }


    /**
     * TODO: set a GCube's motor rotation angle
     * @param CubeIndex GCube number(0, 1, ...), eg: 1
     * @param RotationAngle GCube number(-1000~1000), eg: 90
     */
    //% block="set rotation angle to $RotationAngle of the GCube $CubeIndex"
    export function setAGcubeRotationAngle(CubeIndex: number, RotationAngle: number): void {
        if (connectStage == 2 && CubeIndex < connectedCubeNumber) {
            num_data = [0x38, invValue(0x38), CubeIndex, (RotationAngle >> 8) & 0xFF, RotationAngle & 0xFF, 0, 0, 0, 0, 0]
            sendGcube(num_data)
        }
    }


    /**
     * TODO: stop all of the GCube's motor
     */
    //% block="stop all of the GCube's motor"
    export function stopAllGcubeMotor(): void {
        if (connectStage == 2) {
            for (let i = 0; i < connectedCubeNumber; i++) {
                num_data = [0x30, invValue(0x30), i, 0, 0, 0, 0, 0, 0, 0]
                sendGcube(num_data)
            }
        }
    }


    /**
     * TODO: set all GCube's motor speed
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
    export function setAllGcubeSpeed(dm: string, s7: number, s6: number, s5: number, s4: number, s3: number, s2: number, s1: number, s0: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            num_data = [0x31 + temp, invValue(0x30 + temp), s7, s6, s5, s4, s3, s2, s1, s0]
            sendGcube(num_data)
        }
    }


    /**
     * TODO: set a GCube's motor speed
     * @param CubeIndex GCube number, eg: 1
     * @param MotorSpeed GCube number, eg: 100
     */
    //% block="set motor speed to $MotorSpeed of the GCube $CubeIndex"
    export function setAGcubeSpeed(CubeIndex: number, MotorSpeed: number): void {
        if (connectStage == 2 && CubeIndex < connectedCubeNumber) {
            num_data = [0x30, invValue(0x30), CubeIndex, MotorSpeed, 0, 0, 0, 0, 0, 0]
            sendGcube(num_data)
        }
    }


    /**
     * wait for all GCubes are connected
     * @param cnumber GCube number, eg: 2
     */
    //% block="wait for $cnumber GCubes are connected"
    export function waitAllGcubesConnect(cnumber: number): void {
        if (connectStage == 1) {
            while (1) {
                pause(1000)
                num_data = [0x21, invValue(0x21), 0, 0, 0, 0, 0, 0, 0, 0]
                sendGcube(num_data)

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
     * TODO: wait for first GCube is connected
     */
    //% block="wait for the first GCube is connected"
    export function waitFirstGcubeConnect(): void {
        if (connectStage == 0) {
            rowData = serial.readBuffer(3)
            if (rowData.length == 3) {
                if (rowData[0] == 16 && rowData[1] == 0 && rowData[2] == 0) {
                    led.plot(2, 2)
                    pause(20);
                    num_data = [0x10, invValue(0x10), 0, 0, 0, 112, 0, 0, 0, 0]
                    sendGcube(num_data)
                    connectStage = 1;
                }
            }
        }
    }


}
