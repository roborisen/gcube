

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

    export enum BlinkHz {
        //% block="hz0"
        HZ_0,
        //% block="hz05"
        HZ_05,
        //% block="hz1"
        HZ_1,
        //% block="hz2"
        HZ_2
    }


    function sendGcube(xdata: any[], delayFlag: number) { //Send UART data to Gcube
        let sendData = pins.createBuffer(10);
        for (let i = 0; i <= 9; i++) {
            sendData.setNumber(NumberFormat.UInt8LE, i, xdata[i]);
        }
        serial.writeBuffer(sendData)
        //if(delayFlag==1) pause(50) //Wait for the next command
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

    function sendMatrixStringData(cn: number, t1: number, t2: number, t3: number, t4: number, t5: number, t6: number, t7: number, t8: number): void {
        numData[2] = t1
        numData[3] = t2
        numData[4] = t3
        numData[5] = t4
        numData[6] = t5
        numData[7] = t6
        numData[8] = t7
        numData[9] = t8

        let temp = cn - 1;
        numData[0] = 0x61 + temp
        numData[1] = invValue(0x61 + temp)
        sendGcube(numData, 1)
    }


    function sendMatrixImageData(cn: number, t1: number, t2: number, t3: number, t4: number, t5: number, t6: number, t7: number, t8: number): void {
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


    function sendMatrixBlinkRate(cn: number, blinkrate: number) {
        numData[0] = 0x5A
        numData[1] = invValue(0x5A)
        numData[2] = cn
        numData[3] = blinkrate
        numData[4] = 0
        numData[5] = 0
        numData[6] = 0
        numData[7] = 0
        numData[8] = 0
        numData[9] = 0

        sendGcube(numData, 1)
    }

    function sendMatrixPixelData(cn: number, xpos: number, ypos: number, onoff: number): void {
        numData[2] = cn - 1 //Cube number
        numData[3] = xpos
        numData[4] = ypos
        numData[5] = onoff
        numData[6] = 0
        numData[7] = 0
        numData[8] = 0
        numData[9] = 0

        numData[0] = 0x60
        numData[1] = invValue(0x60)

        sendGcube(numData, 1)
    }


    function sendMatrixCharData(cn: number, input: string) {
        switch (input) {
            case 'A': sendMatrixImageData(cn, letterA[0], letterA[1], letterA[2], letterA[3], letterA[4], letterA[5], letterA[6], letterA[7]); break;
            case 'B': sendMatrixImageData(cn, letterB[0], letterB[1], letterB[2], letterB[3], letterB[4], letterB[5], letterB[6], letterB[7]); break;
            case 'C': sendMatrixImageData(cn, letterC[0], letterC[1], letterC[2], letterC[3], letterC[4], letterC[5], letterC[6], letterC[7]); break;
            case 'D': sendMatrixImageData(cn, letterD[0], letterD[1], letterD[2], letterD[3], letterD[4], letterD[5], letterD[6], letterD[7]); break;
            case 'E': sendMatrixImageData(cn, letterE[0], letterE[1], letterE[2], letterE[3], letterE[4], letterE[5], letterE[6], letterE[7]); break;
            case 'F': sendMatrixImageData(cn, letterF[0], letterF[1], letterF[2], letterF[3], letterF[4], letterF[5], letterF[6], letterF[7]); break;
            case 'G': sendMatrixImageData(cn, letterG[0], letterG[1], letterG[2], letterG[3], letterG[4], letterG[5], letterG[6], letterG[7]); break;
            case 'H': sendMatrixImageData(cn, letterH[0], letterH[1], letterH[2], letterH[3], letterH[4], letterH[5], letterH[6], letterH[7]); break;
            case 'I': sendMatrixImageData(cn, letterI[0], letterI[1], letterI[2], letterI[3], letterI[4], letterI[5], letterI[6], letterI[7]); break;
            case 'J': sendMatrixImageData(cn, letterJ[0], letterJ[1], letterJ[2], letterJ[3], letterJ[4], letterJ[5], letterJ[6], letterJ[7]); break;
            case 'K': sendMatrixImageData(cn, letterK[0], letterK[1], letterK[2], letterK[3], letterK[4], letterK[5], letterK[6], letterK[7]); break;
            case 'L': sendMatrixImageData(cn, letterL[0], letterL[1], letterL[2], letterL[3], letterL[4], letterL[5], letterL[6], letterL[7]); break;
            case 'M': sendMatrixImageData(cn, letterM[0], letterM[1], letterM[2], letterM[3], letterM[4], letterM[5], letterM[6], letterM[7]); break;
            case 'N': sendMatrixImageData(cn, letterN[0], letterN[1], letterN[2], letterN[3], letterN[4], letterN[5], letterN[6], letterN[7]); break;
            case 'O': sendMatrixImageData(cn, letterO[0], letterO[1], letterO[2], letterO[3], letterO[4], letterO[5], letterO[6], letterO[7]); break;
            case 'P': sendMatrixImageData(cn, letterP[0], letterP[1], letterP[2], letterP[3], letterP[4], letterP[5], letterP[6], letterP[7]); break;
            case 'Q': sendMatrixImageData(cn, letterQ[0], letterQ[1], letterQ[2], letterQ[3], letterQ[4], letterQ[5], letterQ[6], letterQ[7]); break;
            case 'R': sendMatrixImageData(cn, letterR[0], letterR[1], letterR[2], letterR[3], letterR[4], letterR[5], letterR[6], letterR[7]); break;
            case 'S': sendMatrixImageData(cn, letterS[0], letterS[1], letterS[2], letterS[3], letterS[4], letterS[5], letterS[6], letterS[7]); break;
            case 'T': sendMatrixImageData(cn, letterT[0], letterT[1], letterT[2], letterT[3], letterT[4], letterT[5], letterT[6], letterT[7]); break;
            case 'U': sendMatrixImageData(cn, letterU[0], letterU[1], letterU[2], letterU[3], letterU[4], letterU[5], letterU[6], letterU[7]); break;
            case 'V': sendMatrixImageData(cn, letterV[0], letterV[1], letterV[2], letterV[3], letterV[4], letterV[5], letterV[6], letterV[7]); break;
            case 'W': sendMatrixImageData(cn, letterW[0], letterW[1], letterW[2], letterW[3], letterW[4], letterW[5], letterW[6], letterW[7]); break;
            case 'X': sendMatrixImageData(cn, letterX[0], letterX[1], letterX[2], letterX[3], letterX[4], letterX[5], letterX[6], letterX[7]); break;
            case 'Y': sendMatrixImageData(cn, letterY[0], letterY[1], letterY[2], letterY[3], letterY[4], letterY[5], letterY[6], letterY[7]); break;
            case 'Z': sendMatrixImageData(cn, letterZ[0], letterZ[1], letterZ[2], letterZ[3], letterZ[4], letterZ[5], letterZ[6], letterZ[7]); break;

            case 'a': sendMatrixImageData(cn, lettera[0], lettera[1], lettera[2], lettera[3], lettera[4], lettera[5], lettera[6], lettera[7]); break;
            case 'b': sendMatrixImageData(cn, letterb[0], letterb[1], letterb[2], letterb[3], letterb[4], letterb[5], letterb[6], letterb[7]); break;
            case 'c': sendMatrixImageData(cn, letterc[0], letterc[1], letterc[2], letterc[3], letterc[4], letterc[5], letterc[6], letterc[7]); break;
            case 'd': sendMatrixImageData(cn, letterd[0], letterd[1], letterd[2], letterd[3], letterd[4], letterd[5], letterd[6], letterd[7]); break;
            case 'e': sendMatrixImageData(cn, lettere[0], lettere[1], lettere[2], lettere[3], lettere[4], lettere[5], lettere[6], lettere[7]); break;
            case 'f': sendMatrixImageData(cn, letterf[0], letterf[1], letterf[2], letterf[3], letterf[4], letterf[5], letterf[6], letterf[7]); break;
            case 'g': sendMatrixImageData(cn, letterg[0], letterg[1], letterg[2], letterg[3], letterg[4], letterg[5], letterg[6], letterg[7]); break;
            case 'h': sendMatrixImageData(cn, letterh[0], letterh[1], letterh[2], letterh[3], letterh[4], letterh[5], letterh[6], letterh[7]); break;
            case 'i': sendMatrixImageData(cn, letteri[0], letteri[1], letteri[2], letteri[3], letteri[4], letteri[5], letteri[6], letteri[7]); break;
            case 'j': sendMatrixImageData(cn, letterj[0], letterj[1], letterj[2], letterj[3], letterj[4], letterj[5], letterj[6], letterj[7]); break;
            case 'k': sendMatrixImageData(cn, letterk[0], letterk[1], letterk[2], letterk[3], letterk[4], letterk[5], letterk[6], letterk[7]); break;
            case 'l': sendMatrixImageData(cn, letterl[0], letterl[1], letterl[2], letterl[3], letterl[4], letterl[5], letterl[6], letterl[7]); break;
            case 'm': sendMatrixImageData(cn, letterm[0], letterm[1], letterm[2], letterm[3], letterm[4], letterm[5], letterm[6], letterm[7]); break;
            case 'n': sendMatrixImageData(cn, lettern[0], lettern[1], lettern[2], lettern[3], lettern[4], lettern[5], lettern[6], lettern[7]); break;
            case 'o': sendMatrixImageData(cn, lettero[0], lettero[1], lettero[2], lettero[3], lettero[4], lettero[5], lettero[6], lettero[7]); break;
            case 'p': sendMatrixImageData(cn, letterp[0], letterp[1], letterp[2], letterp[3], letterp[4], letterp[5], letterp[6], letterp[7]); break;
            case 'q': sendMatrixImageData(cn, letterq[0], letterq[1], letterq[2], letterq[3], letterq[4], letterq[5], letterq[6], letterq[7]); break;
            case 'r': sendMatrixImageData(cn, letterr[0], letterr[1], letterr[2], letterr[3], letterr[4], letterr[5], letterr[6], letterr[7]); break;
            case 's': sendMatrixImageData(cn, letters[0], letters[1], letters[2], letters[3], letters[4], letters[5], letters[6], letters[7]); break;
            case 't': sendMatrixImageData(cn, lettert[0], lettert[1], lettert[2], lettert[3], lettert[4], lettert[5], lettert[6], lettert[7]); break;
            case 'u': sendMatrixImageData(cn, letteru[0], letteru[1], letteru[2], letteru[3], letteru[4], letteru[5], letteru[6], letteru[7]); break;
            case 'v': sendMatrixImageData(cn, letterv[0], letterv[1], letterv[2], letterv[3], letterv[4], letterv[5], letterv[6], letterv[7]); break;
            case 'w': sendMatrixImageData(cn, letterw[0], letterw[1], letterw[2], letterw[3], letterw[4], letterw[5], letterw[6], letterw[7]); break;
            case 'x': sendMatrixImageData(cn, letterx[0], letterx[1], letterx[2], letterx[3], letterx[4], letterx[5], letterx[6], letterx[7]); break;
            case 'y': sendMatrixImageData(cn, lettery[0], lettery[1], lettery[2], lettery[3], lettery[4], lettery[5], lettery[6], lettery[7]); break;
            case 'z': sendMatrixImageData(cn, letterz[0], letterz[1], letterz[2], letterz[3], letterz[4], letterz[5], letterz[6], letterz[7]); break;

            case '0': sendMatrixImageData(cn, letter0[0], letter0[1], letter0[2], letter0[3], letter0[4], letter0[5], letter0[6], letter0[7]); break;
            case '1': sendMatrixImageData(cn, letter1[0], letter1[1], letter1[2], letter1[3], letter1[4], letter1[5], letter1[6], letter1[7]); break;
            case '2': sendMatrixImageData(cn, letter2[0], letter2[1], letter2[2], letter2[3], letter2[4], letter2[5], letter2[6], letter2[7]); break;
            case '3': sendMatrixImageData(cn, letter3[0], letter3[1], letter3[2], letter3[3], letter3[4], letter3[5], letter3[6], letter3[7]); break;
            case '4': sendMatrixImageData(cn, letter4[0], letter4[1], letter4[2], letter4[3], letter4[4], letter4[5], letter4[6], letter4[7]); break;
            case '5': sendMatrixImageData(cn, letter5[0], letter5[1], letter5[2], letter5[3], letter5[4], letter5[5], letter5[6], letter5[7]); break;
            case '6': sendMatrixImageData(cn, letter6[0], letter6[1], letter6[2], letter6[3], letter6[4], letter6[5], letter6[6], letter6[7]); break;
            case '7': sendMatrixImageData(cn, letter7[0], letter7[1], letter7[2], letter7[3], letter7[4], letter7[5], letter7[6], letter7[7]); break;
            case '8': sendMatrixImageData(cn, letter8[0], letter8[1], letter8[2], letter8[3], letter8[4], letter8[5], letter8[6], letter8[7]); break;
            case '9': sendMatrixImageData(cn, letter9[0], letter9[1], letter9[2], letter9[3], letter9[4], letter9[5], letter9[6], letter9[7]); break;

            case '!': sendMatrixImageData(cn, letters1[0], letters1[1], letters1[2], letters1[3], letters1[4], letters1[5], letters1[6], letters1[7]); break;
            case '#': sendMatrixImageData(cn, letters2[0], letters2[1], letters2[2], letters2[3], letters2[4], letters2[5], letters2[6], letters2[7]); break;
            case '$': sendMatrixImageData(cn, letters3[0], letters3[1], letters3[2], letters3[3], letters3[4], letters3[5], letters3[6], letters3[7]); break;
            case '%': sendMatrixImageData(cn, letters4[0], letters4[1], letters4[2], letters4[3], letters4[4], letters4[5], letters4[6], letters4[7]); break;
            case '&': sendMatrixImageData(cn, letters5[0], letters5[1], letters5[2], letters5[3], letters5[4], letters5[5], letters5[6], letters5[7]); break;
            case '?': sendMatrixImageData(cn, letters6[0], letters6[1], letters6[2], letters6[3], letters6[4], letters6[5], letters6[6], letters6[7]); break;
        }
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
            let delayTime = 180 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(delayTime);
        } else if (actionType == GripperStatus.GripperOpen) {
            let rotation = 180 * 2;
            let delayTime = 180 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(delayTime);
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
            let delayTime = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(delayTime);
        } else if (actionType == LeverStatus.LeverUp) {
            let rotation = 90;
            let delayTime = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(delayTime);
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
            let delayTime = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(delayTime);
        } else if (actionType == PenStatus.PenUp) {
            let rotation = 90;
            let delayTime = 90 * 40;
            setAGcubeRotationAngle(0, rotation);
            pause(delayTime);
        }
    }


    /**
     * The rotation command for the Car-type PingPong robot model
     * @param pingpongRobot model name
     * @param angleValue Rotate angle eg:90
     */
    //% block="rotate PingPong robot $angleValue degrees for $pingpongRobot"
    //% group="PingPong robot"
    export function rotateWheelRobot(pingpongRobot: RobotName, angleValue: number): void {
        if (pingpongRobot != RobotName.DrawingBot) { //Geared-wheel type : AutoCar, BattleBot, AntBot
            let rotation = angleValue * 41;
            rotation = rotation / 100;
            let delayTime = Math.abs(angleValue) * 10;
            if (pingpongRobot == RobotName.AutoCar) setAllGcubeRotationAngle(-1 * rotation, -1 * rotation, 0, 0, 0, 0, 0, 0);
            else setAllGcubeRotationAngle(0, -1 * rotation, -1 * rotation, 0, 0, 0, 0, 0);
            pause(delayTime);
        } else { //Not geared-wheel type : Drawing bot
            let rotation = angleValue * 135;
            rotation = rotation / 100;
            let delayTime = Math.abs(angleValue) * 40;
            setAllGcubeRotationAngle(0, -1 * rotation, -1 * rotation, 0, 0, 0, 0, 0);
            pause(delayTime);
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
            let delayTime = Math.abs(moveLength) * 100;
            if (pingpongRobot == RobotName.AutoCar) setAllGcubeRotationAngle(-1 * length, length, 0, 0, 0, 0, 0, 0);
            else setAllGcubeRotationAngle(0, -1 * length, length, 0, 0, 0, 0, 0);
            pause(delayTime);
        } else { //Not geared-wheel type : Drawing bot
            let length = moveLength * 176;
            length = length / 10;
            let delayTime = Math.abs(moveLength) * 400;
            setAllGcubeRotationAngle(0, -1 * length, length, 0, 0, 0, 0, 0);
            pause(delayTime);
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
     * Set blink rate of the matrix.
     * @param blinkRate blink rate number eg:0
     * @param cubeIndex Cube index number eg:1
     */
    //% block="set blink rate $blinkRate Hz matrix of the Gcube $cubeIndex"
    //% group="Dot matrix"
    export function setMatrixBlinkRate(blinkRate: BlinkHz, cubeIndex: number): void {
        let blinkValue = 0
        if (blinkRate == BlinkHz.HZ_0) {
            blinkValue = 0
        } else if (blinkRate == BlinkHz.HZ_05) {
            blinkValue = 1
        } else if (blinkRate == BlinkHz.HZ_1) {
            blinkValue = 2
        } else if (blinkRate == BlinkHz.HZ_2) {
            blinkValue = 3
        }
        sendMatrixBlinkRate(cubeIndex, blinkValue)
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

                sendMatrixImageData(cubeIndex, roll[0], roll[1], roll[2], roll[3], roll[4], roll[5], roll[6], roll[7])
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
                    sendMatrixImageData(c + 1, roll[0], roll[1], roll[2], roll[3], roll[4], roll[5], roll[6], roll[7])
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
                sendMatrixImageData(i + 1, roll[8 * i + 0], roll[8 * i + 1], roll[8 * i + 2], roll[8 * i + 3], roll[8 * i + 4], roll[8 * i + 5], roll[8 * i + 6], roll[8 * i + 7])
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
            sendMatrixImageData(cn, matrixLine(t1), matrixLine(t2), matrixLine(t3), matrixLine(t4), matrixLine(t5), matrixLine(t6), matrixLine(t7), matrixLine(t8))
        }
    }


    /**
     * Draw string on dot matrix of a GCube
     * @param cubeIndex GCube number, eg: 1
     * @param matrixMessage string message, eg: "Hello"
     */
    //% block="show $matrixMessage on the matrix of Gcube $cubeIndex"
    //% group="Dot matrix"
    export function showMessageOnMatrix(cubeIndex: number, matrixMessage: string): void {

        if (matrixMessage.length == 0) return
        else if (matrixMessage.length == 1) {
            sendMatrixCharData(cubeIndex, matrixMessage.charAt(0));
        } else {
            let tempString: number[] = [0, 0, 0, 0, 0, 0, 0, 0]
            for (let i = 0; i < matrixMessage.length; i++) {
                tempString[i] = matrixMessage.charCodeAt(i)
            }
            sendMatrixStringData(cubeIndex, tempString[0], tempString[1], tempString[2], tempString[3], tempString[4], tempString[5], tempString[6], tempString[7])
        }
    }



    /**
     * Turn off a pixel of dot matrix of a GCube
     * @param cubeIndex Gcube number, eg: 1
     * @param xPos X position, eg: 0
     * @param yPos Y position, eg: 0
     */
    //% block="turn off x $xPos y $yPos dotmatrix of Gcube $cubeIndex"
    //% group="Dot matrix"
    export function turnOffMatrix(cubeIndex: number, xPos: number, yPos: number): void {
        sendMatrixPixelData(cubeIndex, xPos, yPos, 0)
    }


    /**
     * Turn on a pixel of dot matrix of a GCube
     * @param cubeIndex Gcube number, eg: 1
     * @param xPos X position, eg: 0
     * @param yPos Y position, eg: 0
     */
    //% block="turn on x $xPos y $yPos dotmatrix of Gcube $cubeIndex"
    //% group="Dot matrix"
    export function turnOnMatrix(cubeIndex: number, xPos: number, yPos: number): void {
        sendMatrixPixelData(cubeIndex, xPos, yPos, 1)
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
