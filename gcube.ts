

/**
 * gcube blocks
 */
//% weight=100 color=#111111 icon="\uf0fe"
//% groups='["Connection", "Gcube motor", "Servo motor", "Dot matrix", "Gcube sensor", "PingPong robot"]'
namespace gcube {

    export enum RobotName {
        //% block="autocar"
        AutoCar,
        //% block="drawingbot"
        DrawingBot,
        //% block="battlebot"
        BattleBot,
        //% block="antbot"
        AntBot
    };

    export enum PenStatus {
        //% block="penup"
        PenUp,
        //% block="pendown"
        PenDown
    };

    export enum LeverStatus {
        //% block="leverup"
        LeverUp,
        //% block="leverdown"
        LeverDown
    };

    export enum GripperStatus {
        //% block="gripperopen"
        GripperOpen,
        //% block="gripperclose"
        GripperClose
    }

    export enum InternalSensor {
        //% block="proximity"
        ProximitySensor,
        //% block="button"
        ButtonSensor
    };

    export enum ExternalSensor {
        //% block="light"
        LightSensor,
        //% block="sound"
        SoundSensor,
        //% block="magnetic"
        MagneticSensor,
        //% block="volume"
        VolumeSensor,
        //% block="temperature"
        TemperatureSensor,
        //% block="ultrasonic"
        UltrasonicSensor,
        //% block="analog"
        AnalogSensor
    };

    export enum ColorSensor {
        //% block="redcolor"
        RedColor,
        //% block="greencolor"
        GreenColor,
        //% block="bluecolor"
        BlueColor,
        //% block="colorkey"
        ColorKey
    };

    export enum CubeAccelerometer {
        //% block="xdata"
        Xdata,
        //% block="ydata"
        Ydata
    };

    export enum ArduinoAnalogPort {
        //% block="a0"
        A0,
        //% block="a1"
        A1,
        //% block="a2"
        A2,
        //% block="a3"
        A3
    };

    export enum TurnOnOff {
        //% block="turnon"
        TurnOn,
        //% block="turnoff"
        TurnOff
    };

    function sendGcube(xdata: any[], d_flag: number) { //Send UART data to Gcube
        let sendData = pins.createBuffer(10);
        for (let i = 0; i <= 9; i++) {
            sendData.setNumber(NumberFormat.UInt8LE, i, xdata[i]);
        }
        serial.writeBuffer(sendData)
        //if(d_flag==1) pause(50) //Wait for the next command
        pause(50)
    }

    function invValue(a: number) {
        return a / 16 + (a & 0x0F) * 16
    }

    function matrixLine(aaa: string) {
        let tMatrix = 0
        for (let i = 0; i < 8; i++) { if (aaa.charAt(3 * i + 2) == '1') tMatrix = tMatrix | (1 << (7 - i)) }
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
        sendGcube(numData, 1)
    }


    let numData: number[] = []
    let rollingImage: string[] = []
    let rowData: Buffer = null
    let connectStage = 0
    let connectedCubeNumber = 0

    const fullMatrix = [0b11111111, 0b11111111, 0b11111111, 0b11111111, 0b11111111, 0b11111111, 0b11111111, 0b11111111];
    const nullMatrix = [0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000];
    const leftArrow = [0b00000000, 0b00011000, 0b00111000, 0b11111111, 0b11111111, 0b00111000, 0b00011000, 0b00000000];
    const rightArrow = [0b00000000, 0b00011000, 0b00011100, 0b11111111, 0b11111111, 0b00011100, 0b00011000, 0b00000000];

    const letterA = [0b00110000, 0b01111000, 0b11001100, 0b11001100, 0b11111100, 0b11001100, 0b11001100, 0b00000000]; // A
    const letterB = [0b11111100, 0b01100110, 0b01100110, 0b01111100, 0b01100110, 0b01100110, 0b11111100, 0b00000000]; // B
    const letterC = [0b00111100, 0b01100110, 0b11000000, 0b11000000, 0b11000000, 0b01100110, 0b00111100, 0b00000000]; // C
    const letterD = [0b11111000, 0b01101100, 0b01100110, 0b01100110, 0b01100110, 0b01101100, 0b11111000, 0b00000000]; // D
    const letterE = [0b11111110, 0b01100010, 0b01101000, 0b01111000, 0b01101000, 0b01100010, 0b11111110, 0b00000000]; // E
    const letterF = [0b11111110, 0b01100010, 0b01101000, 0b01111000, 0b01101000, 0b01100000, 0b11110000, 0b00000000]; // F
    const letterG = [0b00111100, 0b01100110, 0b11000000, 0b11000000, 0b11001110, 0b01100110, 0b00111110, 0b00000000]; // G
    const letterH = [0b11001100, 0b11001100, 0b11001100, 0b11111100, 0b11001100, 0b11001100, 0b11001100, 0b00000000]; // H
    const letterI = [0b01111000, 0b00110000, 0b00110000, 0b00110000, 0b00110000, 0b00110000, 0b01111000, 0b00000000]; // I
    const letterJ = [0b00011110, 0b00001100, 0b00001100, 0b00001100, 0b11001100, 0b11001100, 0b01111000, 0b00000000]; // J
    const letterK = [0b11110110, 0b01100110, 0b01101100, 0b01111000, 0b01101100, 0b01100110, 0b11110110, 0b00000000]; // K
    const letterL = [0b11110000, 0b01100000, 0b01100000, 0b01100000, 0b01100010, 0b01100110, 0b11111110, 0b00000000]; // L
    const letterM = [0b11000110, 0b11101110, 0b11111110, 0b11111110, 0b11010110, 0b11000110, 0b11000110, 0b00000000]; // M
    const letterN = [0b11000110, 0b11100110, 0b11110110, 0b11011110, 0b11001110, 0b11000110, 0b11000110, 0b00000000]; // N
    const letterO = [0b00111000, 0b01101100, 0b11000110, 0b11000110, 0b11000110, 0b01101100, 0b00111000, 0b00000000]; // O
    const letterP = [0b11111100, 0b01100110, 0b01100110, 0b01111100, 0b01100000, 0b01100000, 0b11110000, 0b00000000]; // P
    const letterQ = [0b01111000, 0b11001100, 0b11001100, 0b11001100, 0b11011100, 0b01111000, 0b00011100, 0b00000000]; // Q
    const letterR = [0b11111100, 0b01100110, 0b01100110, 0b01111100, 0b01101100, 0b01100110, 0b11110110, 0b00000000]; // R
    const letterS = [0b01111000, 0b11001100, 0b11100000, 0b01110000, 0b00011100, 0b11001100, 0b01111000, 0b00000000]; // S
    const letterT = [0b11111100, 0b10110100, 0b00110000, 0b00110000, 0b00110000, 0b00110000, 0b01111000, 0b00000000]; // T
    const letterU = [0b11001100, 0b11001100, 0b11001100, 0b11001100, 0b11001100, 0b11001100, 0b11111100, 0b00000000]; // U
    const letterV = [0b11001100, 0b11001100, 0b11001100, 0b11001100, 0b11001100, 0b01111000, 0b00110000, 0b00000000]; // V
    const letterW = [0b11000110, 0b11000110, 0b11000110, 0b11010110, 0b11111110, 0b11101110, 0b11000110, 0b00000000]; // W
    const letterX = [0b11000110, 0b11000110, 0b01101100, 0b00111000, 0b00111000, 0b01101100, 0b11000110, 0b00000000]; // X
    const letterY = [0b11001100, 0b11001100, 0b11001100, 0b01111000, 0b00110000, 0b00110000, 0b01111000, 0b00000000]; // Y
    const letterZ = [0b11111110, 0b11000110, 0b10001100, 0b00011000, 0b00110010, 0b01100110, 0b11111110, 0b00000000]; // Z

    const lettera = [0b00000000, 0b00000000, 0b01111000, 0b00001100, 0b01111100, 0b11001100, 0b01110110, 0b00000000]; // a
    const letterb = [0b11100000, 0b01100000, 0b01100000, 0b01111100, 0b01100110, 0b01100110, 0b11011100, 0b00000000]; // b
    const letterc = [0b00000000, 0b00000000, 0b01111000, 0b11001100, 0b11000000, 0b11001100, 0b01111000, 0b00000000]; // c
    const letterd = [0b00011100, 0b00001100, 0b00001100, 0b01111100, 0b11001100, 0b11001100, 0b01110110, 0b00000000]; // d
    const lettere = [0b00000000, 0b00000000, 0b01111000, 0b11001100, 0b11111100, 0b11000000, 0b01111000, 0b00000000]; // e
    const letterf = [0b00111000, 0b01101100, 0b01100000, 0b11110000, 0b01100000, 0b01100000, 0b11110000, 0b00000000]; // f
    const letterg = [0b00000000, 0b00000000, 0b01110110, 0b11001100, 0b11001100, 0b01111100, 0b00001100, 0b11111000]; // g
    const letterh = [0b11100000, 0b01100000, 0b01101100, 0b01110110, 0b01100110, 0b01100110, 0b11100110, 0b00000000]; // h
    const letteri = [0b00110000, 0b00000000, 0b01110000, 0b00110000, 0b00110000, 0b00110000, 0b01111000, 0b00000000]; // i
    const letterj = [0b00001100, 0b00000000, 0b00001100, 0b00001100, 0b00001100, 0b11001100, 0b11001100, 0b01111000]; // j
    const letterk = [0b11100000, 0b01100000, 0b01100110, 0b01101100, 0b01111000, 0b01101100, 0b11100110, 0b00000000]; // k
    const letterl = [0b01110000, 0b00110000, 0b00110000, 0b00110000, 0b00110000, 0b00110000, 0b01111000, 0b00000000]; // l
    const letterm = [0b00000000, 0b00000000, 0b11001100, 0b11111110, 0b11111110, 0b11010110, 0b11000110, 0b00000000]; // m
    const lettern = [0b00000000, 0b00000000, 0b11111000, 0b11001100, 0b11001100, 0b11001100, 0b11001100, 0b00000000]; // n
    const lettero = [0b00000000, 0b00000000, 0b01111000, 0b11001100, 0b11001100, 0b11001100, 0b01111000, 0b00000000]; // o
    const letterp = [0b00000000, 0b00000000, 0b11011100, 0b01100110, 0b01100110, 0b01111100, 0b01100000, 0b11110000]; // p
    const letterq = [0b00000000, 0b00000000, 0b01110110, 0b11001100, 0b11001100, 0b01111100, 0b00001100, 0b00011110]; // q
    const letterr = [0b00000000, 0b00000000, 0b10011100, 0b01110110, 0b01100110, 0b01100000, 0b11110000, 0b00000000]; // r
    const letters = [0b00000000, 0b00000000, 0b01111100, 0b11000000, 0b01111000, 0b00001100, 0b11111000, 0b00000000]; // s
    const lettert = [0b00010000, 0b00110000, 0b01111100, 0b00110000, 0b00110000, 0b00110100, 0b00011000, 0b00000000]; // t
    const letteru = [0b00000000, 0b00000000, 0b11001100, 0b11001100, 0b11001100, 0b11001100, 0b01110110, 0b00000000]; // u
    const letterv = [0b00000000, 0b00000000, 0b11001100, 0b11001100, 0b11001100, 0b01111000, 0b00110000, 0b00000000]; // v
    const letterw = [0b00000000, 0b00000000, 0b11000110, 0b11000110, 0b11010110, 0b11111110, 0b01101100, 0b00000000]; // w
    const letterx = [0b00000000, 0b00000000, 0b11000110, 0b01101100, 0b00111000, 0b01101100, 0b11000110, 0b00000000]; // x
    const lettery = [0b00000000, 0b00000000, 0b11001100, 0b11001100, 0b11001100, 0b01111100, 0b00001100, 0b11111000]; // y
    const letterz = [0b00000000, 0b00000000, 0b11111100, 0b10011000, 0b00110000, 0b01100100, 0b11111100, 0b00000000]; // z

    const letter0 = [0b01111000, 0b11001100, 0b11011100, 0b11111100, 0b11101100, 0b11001100, 0b01111100, 0b00000000]; // 0
    const letter1 = [0b00110000, 0b01110000, 0b00110000, 0b00110000, 0b00110000, 0b00110000, 0b11111100, 0b00000000]; // 1
    const letter2 = [0b01111000, 0b11001100, 0b00001100, 0b00111000, 0b01100000, 0b11001100, 0b11111100, 0b00000000]; // 2
    const letter3 = [0b01111000, 0b11001100, 0b00001100, 0b00111000, 0b00001100, 0b11001100, 0b01111000, 0b00000000]; // 3
    const letter4 = [0b00011100, 0b00111100, 0b01101100, 0b11001100, 0b11111110, 0b00001100, 0b00011110, 0b00000000]; // 4
    const letter5 = [0b11111100, 0b11000000, 0b11111000, 0b00001100, 0b00001100, 0b11001100, 0b01111000, 0b00000000]; // 5
    const letter6 = [0b00111000, 0b01100000, 0b11000000, 0b11111000, 0b11001100, 0b11001100, 0b01111000, 0b00000000]; // 6
    const letter7 = [0b11111100, 0b11001100, 0b00001100, 0b00011000, 0b00110000, 0b00110000, 0b00110000, 0b00000000]; // 7
    const letter8 = [0b01111000, 0b11001100, 0b11001100, 0b01111000, 0b11001100, 0b11001100, 0b01111000, 0b00000000]; // 8
    const letter9 = [0b01111000, 0b11001100, 0b11001100, 0b01111100, 0b00001100, 0b00011000, 0b01110000, 0b00000000]; // 9

    const letters1 = [0b00110000, 0b01111000, 0b01111000, 0b00110000, 0b00110000, 0b00000000, 0b00110000, 0b00000000]; // !
    const letters2 = [0b01101100, 0b01101100, 0b11111110, 0b01101100, 0b11111110, 0b01101100, 0b01101100, 0b00000000]; // #
    const letters3 = [0b00110000, 0b01111100, 0b11000000, 0b01111000, 0b00001100, 0b11111000, 0b00110000, 0b00000000]; // $
    const letters4 = [0b00000000, 0b11000110, 0b11001100, 0b00011000, 0b00110000, 0b01100110, 0b11000110, 0b00000000]; // %
    const letters5 = [0b00111000, 0b01101100, 0b00111000, 0b01110110, 0b11011100, 0b11001100, 0b01110110, 0b00000000]; // &
    const letters6 = [0b01111000, 0b11001100, 0b00001100, 0b00011000, 0b00110000, 0b00000000, 0b00110000, 0b00000000]; // ?


    serial.redirect(SerialPin.P1, SerialPin.P2, 115200)
    serial.setRxBufferSize(10)
    serial.setTxBufferSize(10)


    /**
     * The gripper control command for the Ant Bot
     * @param actionType Rotate angle
     */
    //% block="$actionType of Ant Bot"
    //% group="PingPong robot"
    export function gripperControl(actionType: GripperStatus): void {
        if (actionType == GripperStatus.GripperClose) {
            let rotation = -180 * 2;
            let d_time = 180 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(d_time);
        } else if (actionType == GripperStatus.GripperOpen) {
            let rotation = 180 * 2;
            let d_time = 180 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(d_time);
        }
    }


    /**
     * The lever control command for the Battle Bot
     * @param actionType Rotate angle
     */
    //% block="$actionType of Battle Bot"
    //% group="PingPong robot"
    export function leverControl(actionType: LeverStatus): void {
        if (actionType == LeverStatus.LeverDown) {
            let rotation = -90;
            let d_time = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(d_time);
        } else if (actionType == LeverStatus.LeverUp) {
            let rotation = 90;
            let d_time = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(d_time);
        }
    }


    /**
     * The pen control command for the Drawing Bot
     * @param actionType Rotate angle
     */
    //% block="$actionType of Drawing Bot"
    //% group="PingPong robot"
    export function penControl(actionType: PenStatus): void {
        if (actionType == PenStatus.PenDown) {
            let rotation = -90;
            let d_time = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(d_time);
        } else if (actionType == PenStatus.PenUp) {
            let rotation = 90;
            let d_time = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(d_time);
        }
    }


    /**
     * The rotation command for the Car-type PingPong robot model
     * @param pingpongRobot model name
     * @param angleValue Rotate angle eg:90
     */
    //% block="rotate PingPong robot $angleValue degree for $pingpongRobot"
    //% group="PingPong robot"
    export function rotateWheelRobot(pingpongRobot: RobotName, angleValue: number): void {
        if (pingpongRobot != RobotName.DrawingBot) { //Geared-wheel type : AutoCar, BattleBot, AntBot
            let rotation = angleValue * 41;
            rotation = rotation / 100;
            let d_time = Math.abs(angleValue) * 10;
            if (pingpongRobot == RobotName.AutoCar) setAllGcubeRotationAngle(-1 * rotation, -1 * rotation, 0, 0, 0, 0, 0, 0);
            else setAllGcubeRotationAngle(0, -1 * rotation, -1 * rotation, 0, 0, 0, 0, 0);
            pause(d_time);
        } else { //Not geared-wheel type : Drawing bot
            let rotation = angleValue * 135;
            rotation = rotation / 100;
            let d_time = Math.abs(angleValue) * 40;
            setAllGcubeRotationAngle(0, -1 * rotation, -1 * rotation, 0, 0, 0, 0, 0);
            pause(d_time);
        }
    }

    /**
     * The move command for the Car-type PingPong robot model
     * @param pingpongRobot model name
     * @param moveLength Move length eg:10
     */
    //% block="move PingPong robot $moveLength cm for $pingpongRobot"
    //% group="PingPong robot"
    export function moveWheelRobot(pingpongRobot: RobotName, moveLength: number): void {
        if (pingpongRobot != RobotName.DrawingBot) { //Geared-wheel type : AutoCar, BattleBot, AntBot
            let length = moveLength * 44;
            length = length / 10;
            let d_time = Math.abs(moveLength) * 100;
            if (pingpongRobot == RobotName.AutoCar) setAllGcubeRotationAngle(-1 * length, length, 0, 0, 0, 0, 0, 0);
            else setAllGcubeRotationAngle(0, -1 * length, length, 0, 0, 0, 0, 0);
            pause(d_time);
        } else { //Not geared-wheel type : Drawing bot
            let length = moveLength * 176;
            length = length / 10;
            let d_time = Math.abs(moveLength) * 400;
            setAllGcubeRotationAngle(0, -1 * length, length, 0, 0, 0, 0, 0);
            pause(d_time);
        }
    }

    /**
     * The read Gcube's Arduino analog port command
     * @param cubeNumber Cube Number eg:1
     * @param portSelect Arduino analog port selection eg:0
     */
    //% block="Arduino $portSelect port value of Gcube $cubeNumber"
    //% group="Gcube sensor"
    export function readCubeArduinoAnalog(cubeNumber: number, portSelect: ArduinoAnalogPort): number {
        if (portSelect == ArduinoAnalogPort.A0)
            numData = [0xD0 + cubeNumber, invValue(0xD0 + cubeNumber), 0, 0, 0, 0, 0, 0, 0, 0]
        else if (portSelect == ArduinoAnalogPort.A1)
            numData = [0xD0 + cubeNumber, invValue(0xD0 + cubeNumber), 1, 0, 0, 0, 0, 0, 0, 0]
        else if (portSelect == ArduinoAnalogPort.A2)
            numData = [0xD0 + cubeNumber, invValue(0xD0 + cubeNumber), 2, 0, 0, 0, 0, 0, 0, 0]
        else if (portSelect == ArduinoAnalogPort.A3)
            numData = [0xD0 + cubeNumber, invValue(0xD0 + cubeNumber), 3, 0, 0, 0, 0, 0, 0, 0]

        sendGcube(numData, 0)

        rowData = serial.readBuffer(3)

        if (rowData.length == 3) {
            return (16 * rowData[1] + rowData[2]); // 12 bit resolution
        }
        return 0;
    }


    /**
     * The read Gcube's sensor command
     * @param cubeNumber Cube Number eg:1
     * @param sensorSelect Sensor selection
     */
    //% block="color $sensorSelect value of Gcube $cubeNumber"
    //% group="Gcube sensor"
    export function readColorSensor(cubeNumber: number, sensorSelect: ColorSensor): number {

        if (sensorSelect == ColorSensor.ColorKey) {
            numData = [0xE0 + cubeNumber, invValue(0xE0 + cubeNumber), 0, 0, 0, 0, 0, 0, 0, 0]
            sendGcube(numData, 0)
            rowData = serial.readBuffer(3)
            return (rowData[2]); // color_key
        } else {
            numData = [0xE8 + cubeNumber, invValue(0xE8 + cubeNumber), 0, 0, 0, 0, 0, 0, 0, 0]
            sendGcube(numData, 0)
            rowData = serial.readBuffer(3)
            if (sensorSelect == ColorSensor.RedColor) return rowData[0];
            else if (sensorSelect == ColorSensor.GreenColor) return rowData[1];
            else return rowData[2];
        }
    }


    /**
     * The read Gcube's sensor command
     * @param cubeNumber Cube Number eg:1
     * @param sensorSelect Sensor selection
     */
    //% block="external $sensorSelect sensor value of Gcube $cubeNumber"
    //% group="Gcube sensor"
    export function readExternalCubeSensor(cubeNumber: number, sensorSelect: ExternalSensor): number {
        numData = [0xB0 + cubeNumber, invValue(0xB0 + cubeNumber), 0, 0, 0, 0, 0, 0, 0, 0]
        sendGcube(numData, 0)
        rowData = serial.readBuffer(3)

        if (sensorSelect == ExternalSensor.TemperatureSensor) {
            return (rowData[1]); // upper digit
        } else if (sensorSelect == ExternalSensor.VolumeSensor || sensorSelect == ExternalSensor.MagneticSensor || sensorSelect == ExternalSensor.AnalogSensor) {
            return (16 * rowData[1] + rowData[2]); // 12 bit resolution
        } else {
            return (rowData[1]); //
        }
    }



    /**
     * The read Gcube's accelerometer sensor command
     * @param cubeNumber Cube Number eg:1
     * @param axisSelect Sensor selection eg:10
     */
    //% block="$axisSelect value of Gcube $cubeNumber"
    //% group="Gcube sensor"
    export function readCubeAccelerometer(cubeNumber: number, axisSelect: CubeAccelerometer): number {
        numData = [0xA0 + cubeNumber, invValue(0xA0 + cubeNumber), 0, 0, 0, 0, 0, 0, 0, 0]
        sendGcube(numData, 0)

        rowData = serial.readBuffer(3)
        if (rowData.length == 3) {
            if (axisSelect == CubeAccelerometer.Xdata) {
                if (rowData[1] >= 128) return -1 * (256 - rowData[1]);
                else return rowData[1];
            }
            else {
                if (rowData[2] >= 128) return 1 * (256 - rowData[2]);
                else return -1 * rowData[2];
            }
            //            if (axisSelect == CubeAccelerometer.Xdata) return 10;
            //            else return 20;
        }
        return 0;
    }


    /**
     * The read Gcube's sensor command
     * @param cubeNumber Cube Number eg:1
     * @param sensorSelect Sensor selection
     */
    //% block="$sensorSelect sensor value of Gcube $cubeNumber"
    //% group="Gcube sensor"
    export function readInternalCubeSensor(cubeNumber: number, sensorSelect: InternalSensor): number {
        if (sensorSelect == InternalSensor.ProximitySensor) {
            numData = [0xAA, invValue(0xAA), cubeNumber, 0, 0, 0, 0, 0, 0, 0]
            sendGcube(numData, 0)

            rowData = serial.readBuffer(3)
            return rowData[2];
        } else if (sensorSelect == InternalSensor.ButtonSensor) {
            numData = [0xAB, invValue(0xAB), cubeNumber, 0, 0, 0, 0, 0, 0, 0]
            sendGcube(numData, 0)

            rowData = serial.readBuffer(3)
            return rowData[2];
        }
        return 0;
    }


    /**
     * The image moves according to the micro:bit's acceleration sensor value.
     * @param cubeIndex Cube index number eg:1
     */
    //% block="start shifting matrix image for the Gcube $cubeIndex"
    //% group="Dot matrix"
    export function startShiftingMatrixImage(cubeIndex: number): void {
        if (connectStage < 2) return

        let roll: number[] = []

        for (let i = 0; i < 8 * 8; i++) roll[i] = 0

        let xPosition = 0
        let yPosition = 0

        //infinite loop for stop_rolling_matrix_image
        let temp = connectedCubeNumber - 1; // the number of dot matrix plugged Gcubes

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
     * start rolling matrix image for a given period
     * @param duration time(rotation number) eg:1000
     */
    //% block="start rolling matrix image for $duration seconds"
    //% group="Dot matrix"
    export function startRollingMatrixImage(duration: number): void {
        if (connectStage < 2) return

        let roll: number[] = []

        for (let i = 0; i < 8 * 8; i++) roll[i] = 0

        let currentRollIndex = 0
        let durIndex = 0

        //infinite loop for stop_rolling_matrix_image
        let temp = connectedCubeNumber - 1; // the number of dot matrix plugged Gcubes
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
     * set default rolling display image of 8x8 dot Matrix of a Gcube
     * @param dm Dummy index, eg: :
     * @param t1 image line, eg: "__0__0__0__0__0__0__0__0__"
     * @param t2 image line, eg: "__0__0__0__0__0__0__0__0__"
     * @param t3 image line, eg: "__0__0__0__1__1__0__0__0__"
     * @param t4 image line, eg: "__0__0__1__1__1__1__0__0__"
     * @param t5 image line, eg: "__0__0__1__1__1__1__0__0__"
     * @param t6 image line, eg: "__0__0__0__1__1__0__0__0__"
     * @param t7 image line, eg: "__0__0__0__0__0__0__0__0__"
     * @param t8 image line, eg: "__0__0__0__0__0__0__0__0__"
     */
    //% block
    //% group="Dot matrix"
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
     * set display image for 8x8 dot matrix of Gcube from Gcube 1 ~ Gcube 8
     * @param cn Gcube index, eg: 1
     * @param t1 image line, eg: "__0__0__0__0__0__0__0__0__"
     * @param t2 image line, eg: "__0__0__0__0__0__0__0__0__"
     * @param t3 image line, eg: "__0__0__0__1__1__0__0__0__"
     * @param t4 image line, eg: "__0__0__1__0__0__1__0__0__"
     * @param t5 image line, eg: "__0__0__1__0__0__1__0__0__"
     * @param t6 image line, eg: "__0__0__0__1__1__0__0__0__"
     * @param t7 image line, eg: "__0__0__0__0__0__0__0__0__"
     * @param t8 image line, eg: "__0__0__0__0__0__0__0__0__"
     */
    //% block="set matrix image of the Gcube $cn $t1 $t2 $t3 $t4 $t5 $t6 $t7 $t8"
    //% group="Dot matrix"
    export function setMatrixDisplay(cn: number, t1: string, t2: string, t3: string, t4: string, t5: string, t6: string, t7: string, t8: string): void {
        if (connectStage == 2) {
            sendMatrixData(cn, matrixLine(t1), matrixLine(t2), matrixLine(t3), matrixLine(t4), matrixLine(t5), matrixLine(t6), matrixLine(t7), matrixLine(t8))
        }
    }


    /**
     * Draw string on dot matrix of a GCube
     * @param cubeIndex GCube number, eg: 1
     * @param matrixMessage string message, eg: "Hello"
     */
    //% block="Show $matrixMessage on the matrix of Gcube $cubeIndex"
    //% group="Dot matrix"
    export function showMessageOnMatrix(cubeIndex: number, matrixMessage: string): void {
        sendMatrixData(cubeIndex, letterA[0], letterA[1], letterA[2], letterA[3], letterA[4], letterA[5], letterA[6], letterA[7])
    }


    /**
     * plot a pixel of dot matrix of a GCube
     * @param cubeIndex Gcube number, eg: 1
     * @param xPos X position, eg: 0
     * @param yPos Y position, eg: 0
     */
    //% block="Turn on x $xPos y $yPos dotmatrix of Gcube $cubeIndex"
    //% group="Dot matrix"
    export function turnOnMatrix(cubeIndex: number, xPos: number, yPos: number): void {

    }




    /**
     * set all Gcube's servo motor to each angle
     * @param a7 angle of Cube 7 servo, eg: 0
     * @param a6 angle of Cube 6 servo, eg: 0
     * @param a5 angle of Cube 5 servo, eg: 0
     * @param a4 angle of Cube 4 servo, eg: 0
     * @param a3 angle of Cube 3 servo, eg: 0
     * @param a2 angle of Cube 2 servo, eg: 0
     * @param a1 angle of Cube 1 servo, eg: 0
     * @param a0 angle of Cube 0 servo, eg: 0
     */
    //% block="set each Gcubes servo motor angle| Gcube0 = $a0| Gcube1 = $a1| Gcube2 = $a2| Gcube3 = $a3| Gcube4 = $a4| Gcube5 = $a5| Gcube6 = $a6| Gcube7 = $a7"
    //% group="Servo motor"
    export function setAllGcubeServoMotorAngle(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            numData = [0x41 + temp, invValue(0x41 + temp), a7, a6, a5, a4, a3, a2, a1, a0]
            sendGcube(numData, 1)
        }
    }


    /**
     * set a Gcube's servo motor to an angle
     * @param cubeIndex Gcube number, eg: 1
     * @param servoAngle Gcube number, eg: 90
     */
    //% block="set servo motor angle to $servoAngle of the Gcube $cubeIndex"
    //% group="Servo motor"
    export function setAGcubeServoAngle(cubeIndex: number, servoAngle: number): void {
        if (connectStage == 2 && cubeIndex < connectedCubeNumber) {
            numData = [0x40, invValue(0x40), cubeIndex, servoAngle, 0, 0, 0, 0, 0, 0]
            sendGcube(numData, 1)
        }
    }

    /**
     * set all Gcube's motor to each rotation angle
     * @param r7 rotation angle of Cube 7, eg: 0
     * @param r6 rotation angle of Cube 6, eg: 0
     * @param r5 rotation angle of Cube 5, eg: 0
     * @param r4 rotation angle of Cube 4, eg: 0
     * @param r3 rotation angle of Cube 3, eg: 0
     * @param r2 rotation angle of Cube 2, eg: 0
     * @param r1 rotation angle of Cube 1, eg: 0
     * @param r0 rotation angle of Cube 0, eg: 0
     */
    //% block="set each Gcube rotation angle| Gcube0 = $r0| Gcube1 = $r1| Gcube2 = $r2| Gcube3 = $r3| Gcube4 = $r4| Gcube5 = $r5| Gcube6 = $r6| Gcube7 = $r7"
    //% group="Gcube motor"
    export function setAllGcubeRotationAngle(r0: number, r1: number, r2: number, r3: number, r4: number, r5: number, r6: number, r7: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;

            if (temp < 3) {
                r3 = 100 * r3 / 18;
                r2 = 100 * r2 / 18;
                r1 = 100 * r1 / 18;
                r0 = 100 * r0 / 18;

                numData = [0x39 + temp, invValue(0x39 + temp), (r3 >> 8) & 0xFF, r3 & 0xFF, (r2 >> 8) & 0xFF, r2 & 0xFF, (r1 >> 8) & 0xFF, r1 & 0xFF, (r0 >> 8) & 0xFF, r0 & 0xFF]
                sendGcube(numData, 1);
            } else {
                r3 = 100 * r3 / 18;
                r2 = 100 * r2 / 18;
                r1 = 100 * r1 / 18;
                r0 = 100 * r0 / 18;

                numData = [0x39 + 2, invValue(0x39 + 2), (r3 >> 8) & 0xFF, r3 & 0xFF, (r2 >> 8) & 0xFF, r2 & 0xFF, (r1 >> 8) & 0xFF, r1 & 0xFF, (r0 >> 8) & 0xFF, r0 & 0xFF]
                sendGcube(numData, 1);

                r7 = 100 * r7 / 18;
                r6 = 100 * r6 / 18;
                r5 = 100 * r5 / 18;
                r4 = 100 * r4 / 18;

                numData = [0x39 + temp, invValue(0x39 + temp), (r7 >> 8) & 0xFF, r7 & 0xFF, (r6 >> 8) & 0xFF, r6 & 0xFF, (r5 >> 8) & 0xFF, r5 & 0xFF, (r4 >> 8) & 0xFF, r4 & 0xFF]
                sendGcube(numData, 1);

            }
        }
    }


    /**
     * set a Gcube's motor to a rotation angle
     * @param cubeIndex Gcube number(0, 1, ...), eg: 1
     * @param rotationAngle Gcube number(-1000~1000), eg: 180
     */
    //% block="set rotation angle to $rotationAngle of the Gcube $cubeIndex"
    //% group="Gcube motor"
    export function setAGcubeRotationAngle(cubeIndex: number, rotationAngle: number): void {
        if (connectStage == 2 && cubeIndex < connectedCubeNumber) {
            rotationAngle = 100 * rotationAngle / 18
            numData = [0x38, invValue(0x38), cubeIndex, (rotationAngle >> 8) & 0xFF, rotationAngle & 0xFF, 0, 0, 0, 0, 0]
            sendGcube(numData, 1)
        }
    }


    /**
     * stop all of the Gcube's motor
     */
    //% block="stop all of the Gcube's motor"
    //% group="Gcube motor"
    export function stopAllGcubeMotor(): void {
        if (connectStage == 2) {
            for (let i = 0; i < connectedCubeNumber; i++) {
                numData = [0x30, invValue(0x30), i, 0, 0, 0, 0, 0, 0, 0]
                sendGcube(numData, 1)
            }
        }
    }


    /**
     * set all Gcube's motor to each speed
     * @param s7 speed of Cube 7, eg: 0
     * @param s6 speed of Cube 6, eg: 0
     * @param s5 speed of Cube 5, eg: 0
     * @param s4 speed of Cube 4, eg: 0
     * @param s3 speed of Cube 3, eg: 0
     * @param s2 speed of Cube 2, eg: 0
     * @param s1 speed of Cube 1, eg: 0
     * @param s0 speed of Cube 0, eg: 0
     */
    //% block="set each Gcube motor's speed| Gcube0 = $s0| Gcube1 = $s1| Gcube2 = $s2| Gcube3 = $s3| Gcube4 = $s4| Gcube5 = $s5| Gcube6 = $s6| Gcube7 = $s7"
    //% group="Gcube motor"
    export function setAllGcubeSpeed(s0: number, s1: number, s2: number, s3: number, s4: number, s5: number, s6: number, s7: number): void {
        if (connectStage == 2) {
            let temp = connectedCubeNumber - 2;
            numData = [0x31 + temp, invValue(0x31 + temp), s7, s6, s5, s4, s3, s2, s1, s0]
            sendGcube(numData, 1)
        }
    }


    /**
     * set a Gcube's motor to a speed
     * @param cubeIndex Gcube number, eg: 1
     * @param motorSpeed Gcube number, eg: 100
     */
    //% block="set motor speed to $motorSpeed of the Gcube $cubeIndex"
    //% group="Gcube motor"
    export function setAGcubeSpeed(cubeIndex: number, motorSpeed: number): void {
        if (connectStage == 2 && cubeIndex < connectedCubeNumber) {
            numData = [0x30, invValue(0x30), cubeIndex, motorSpeed, 0, 0, 0, 0, 0, 0]
            sendGcube(numData, 1)
        }
    }


    /**
     * wait for all Gcubes are connected for user's project
     * @param cnumber Gcube number, eg: 2
     */
    //% block="wait until $cnumber Gcubes are connected"
    //% group="Connection"
    export function waitAllGcubesConnect(cnumber: number): void {
        if (connectStage == 1) {
            while (1) {
                pause(1000)
                numData = [0x21, invValue(0x21), 0, 0, 0, 0, 0, 0, 0, 0]
                sendGcube(numData, 1)

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

                            pause(1000)
                            //Send connection complete message to Gcube 0
                            numData = [0x2A, invValue(0x2A), cnumber, 0, 0, 0, 0, 0, 0, 0]
                            sendGcube(numData, 1)
                            pause(1000)

                            break
                        }
                    }
                }
            }
        }
    }

    /**
     * wait for first Gcube is connected
     */
    //% block="wait until the first Gcube is connected"
    //% group="Connection"
    export function waitFirstGcubeConnect(): void {
        if (connectStage == 0) {
            rowData = serial.readBuffer(3)
            if (rowData.length == 3) {
                if (rowData[0] == 16 && rowData[1] == 0 && rowData[2] == 0) {
                    led.plot(2, 2)
                    pause(20);
                    numData = [0x10, invValue(0x10), 0, 0, 0, 112, 0, 0, 0, 0]
                    sendGcube(numData, 1)
                    connectStage = 1;
                }
            }
        }
    }


}
