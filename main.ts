/**
 * Custom functions and blocks for interfacing with TFT display
 * and most code is from http://www.obliquely.org.uk/connecting-a-microbit-and-adafruit-1-44-display/
 *
 * For documentation on the AdaFruit 1.44" TFT display
 * see: https://learn.adafruit.com/adafruit-1-44-color-tft-with-micro-sd-socket
 *
 * The code to drive the display has been adapted from the code provided (in C++)
 * by AdaFruit.
 *
 * For syntax that makes functions and enums available in the blocks editor
 * see https://makecode.microbit.org/blocks/custom
 */

enum DISPLAY_CONTROLLER {

    ST7735 = 0,
    ILI9341 = 1
}

enum COLOR {
    //% block="Black"
    Black = 0x0000,
    //% block="Navy"
    Navy = 0x000F,
    //% block="DarkGreen"
    DarkGreen = 0x03E0,
    //% block="DarkCyan"
    DarkCyan = 0x03EF,
    //% block="Maroon"
    Maroon = 0x7800,
    //% block="Purple"
    Purple = 0x780F,
    //% block="Olive"
    Olive = 0x7BE0,
    //% block="LightGrey"
    LightGrey = 0xC618,
    //% block="DarkGrey"
    DarkGrey = 0x7BEF,
    //% block="Blue"
    Blue = 0x001F,
    //% block="Green"
    Green = 0x07E0,
    //% block="Cyan"
    Cyan = 0x07FF,
    //% block="Red"
    Red = 0xF800,
    //% block="Magenta"
    Magenta = 0xF81F,
    //% block="Yellow"
    Yellow = 0xFFE0,
    //% block="White"
    White = 0xFFFF,
    //% block="Orange"
    Orange = 0xFD20,
    //% block="GreenYellow"
    GreenYellow = 0xAFE5,
    //% block="Pink"
    Pink = 0xF81F
};

//% weight=20 color=#000fff icon="\uf10b" block="LCD"
namespace TFTDisplay {

    let font: number[] = [];
    font[0] = 0x0022d422;
    font[1] = 0x0022d422;
    font[2] = 0x0022d422;
    font[3] = 0x0022d422;
    font[4] = 0x0022d422;
    font[5] = 0x0022d422;
    font[6] = 0x0022d422;
    font[7] = 0x0022d422;
    font[8] = 0x0022d422;
    font[9] = 0x0022d422;
    font[10] = 0x0022d422;
    font[11] = 0x0022d422;
    font[12] = 0x0022d422;
    font[13] = 0x0022d422;
    font[14] = 0x0022d422;
    font[15] = 0x0022d422;
    font[16] = 0x0022d422;
    font[17] = 0x0022d422;
    font[18] = 0x0022d422;
    font[19] = 0x0022d422;
    font[20] = 0x0022d422;
    font[21] = 0x0022d422;
    font[22] = 0x0022d422;
    font[23] = 0x0022d422;
    font[24] = 0x0022d422;
    font[25] = 0x0022d422;
    font[26] = 0x0022d422;
    font[27] = 0x0022d422;
    font[28] = 0x0022d422;
    font[29] = 0x0022d422;
    font[30] = 0x0022d422;
    font[31] = 0x0022d422;
    font[32] = 0x00000000;
    font[33] = 0x000002e0;
    font[34] = 0x00018060;
    font[35] = 0x00afabea;
    font[36] = 0x00aed6ea;
    font[37] = 0x01991133;
    font[38] = 0x010556aa;
    font[39] = 0x00000060;
    font[40] = 0x000045c0;
    font[41] = 0x00003a20;
    font[42] = 0x00051140;
    font[43] = 0x00023880;
    font[44] = 0x00002200;
    font[45] = 0x00021080;
    font[46] = 0x00000100;
    font[47] = 0x00111110;
    font[48] = 0x0007462e;
    font[49] = 0x00087e40;
    font[50] = 0x000956b9;
    font[51] = 0x0005d629;
    font[52] = 0x008fa54c;
    font[53] = 0x009ad6b7;
    font[54] = 0x008ada88;
    font[55] = 0x00119531;
    font[56] = 0x00aad6aa;
    font[57] = 0x0022b6a2;
    font[58] = 0x00000140;
    font[59] = 0x00002a00;
    font[60] = 0x0008a880;
    font[61] = 0x00052940;
    font[62] = 0x00022a20;
    font[63] = 0x0022d422;
    font[64] = 0x00e4d62e;
    font[65] = 0x000f14be;
    font[66] = 0x000556bf;
    font[67] = 0x0008c62e;
    font[68] = 0x0007463f;
    font[69] = 0x0008d6bf;
    font[70] = 0x000094bf;
    font[71] = 0x00cac62e;
    font[72] = 0x000f909f;
    font[73] = 0x000047f1;
    font[74] = 0x0017c629;
    font[75] = 0x0008a89f;
    font[76] = 0x0008421f;
    font[77] = 0x01f1105f;
    font[78] = 0x01f4105f;
    font[79] = 0x0007462e;
    font[80] = 0x000114bf;
    font[81] = 0x000b6526;
    font[82] = 0x010514bf;
    font[83] = 0x0004d6b2;
    font[84] = 0x0010fc21;
    font[85] = 0x0007c20f;
    font[86] = 0x00744107;
    font[87] = 0x01f4111f;
    font[88] = 0x000d909b;
    font[89] = 0x00117041;
    font[90] = 0x0008ceb9;
    font[91] = 0x0008c7e0;
    font[92] = 0x01041041;
    font[93] = 0x000fc620;
    font[94] = 0x00010440;
    font[95] = 0x01084210;
    font[96] = 0x00000820;
    font[97] = 0x010f4a4c;
    font[98] = 0x0004529f;
    font[99] = 0x00094a4c;
    font[100] = 0x000fd288;
    font[101] = 0x000956ae;
    font[102] = 0x000097c4;
    font[103] = 0x0007d6a2;
    font[104] = 0x000c109f;
    font[105] = 0x000003a0;
    font[106] = 0x0006c200;
    font[107] = 0x0008289f;
    font[108] = 0x000841e0;
    font[109] = 0x01e1105e;
    font[110] = 0x000e085e;
    font[111] = 0x00064a4c;
    font[112] = 0x0002295e;
    font[113] = 0x000f2944;
    font[114] = 0x0001085c;
    font[115] = 0x00012a90;
    font[116] = 0x010a51e0;
    font[117] = 0x010f420e;
    font[118] = 0x00644106;
    font[119] = 0x01e8221e;
    font[120] = 0x00093192;
    font[121] = 0x00222292;
    font[122] = 0x00095b52;
    font[123] = 0x0008fc80;
    font[124] = 0x000003e0;
    font[125] = 0x000013f1;
    font[126] = 0x00841080;
    font[127] = 0x0022d422;

    /**
     * TFT display commands
     * Only the commands actually used are included here. See the ST7735R
     * data sheet for the full set of commands.
     */
    enum TftCom {
        NOOP = 0x00,
        SWRESET = 0x01,
        SLPOUT = 0x11,
        NORON = 0x13,
        INVOFF = 0x20,
        GMCRV = 0x26,
        DISPON = 0x29,
        CASET = 0x2A,
        RASET = 0x2B,
        RAMWR = 0x2C,
        SCLDEF = 0x33,
        MADCTL = 0x36,
        SCLAMT = 0x37,
        COLMOD = 0x3A,
        FRMCTR1 = 0xB1,
        FRMCTR2 = 0xB2,
        FRMCTR3 = 0xB3,
        INVCTR = 0xB4,
        DFCTL = 0xB6,
        PWCTR1 = 0xC0,
        PWCTR2 = 0xC1,
        PWCTR3 = 0xC2,
        PWCTR4 = 0xC3,
        PWCTR5 = 0xC4,
        PWCTRA = 0xCB,
        PWCTRB = 0xCF,
        VMCTR1 = 0xC5,
        VMCTR2 = 0xC7,
        GMCTRP1 = 0xE0,
        GMCTRN1 = 0xE1,
        DTCTRA = 0xE8,
        DTCTRB = 0xEA,
        POSEQ = 0xED,
        GAMFUN = 0xF2,
        PMPRTO = 0xF7,
        DELAY = 0xFFFF,
        STSL = 0x44
    }

    let screen_x = 128
    let screen_y = 160
    let scroll_top = 0
    let scroll_area = 0
    let model = DISPLAY_CONTROLLER.ST7735
    let DC = DigitalPin.P9
    let CS = DigitalPin.P16
    let RS = DigitalPin.P8
    let _ZOOM = 0

    function displayScale(): number {
        return 1
    }

    /**
     * The display width in 'working coordinates'. These are pixel values * displayScale()
     */
    function displayWidth(): number {
        return screen_x * displayScale()
    }

    /**
     * The display height in 'working coordinates'. These are pixel values * displayScale()
     */
    function displayHeight(): number {
        return screen_y * displayScale()
    }

    /**
     * Convert a working coordinate to an actual pixel coordinate.
     * Don't expose this in final code. It should be internal.
     */
    function roundedPixel(value: number): number {
        let adjusted = value / displayScale();
        adjusted = adjusted + (value & (displayScale() - 1) ? 1 : 0)
        return adjusted;
    }

    function outOfBounds(v1: number, v2 = 0, v3 = 0, v4 = 0): boolean {
        if (v1 < 0 || v1 > screen_x - 1) {
            return true
        }
        if (v2 < 0 || v2 > screen_y - 1) {
            return true
        }
        if (v3 < 0 || v3 > screen_x - 1) {
            return true
        }
        if (v4 < 0 || v4 > screen_y - 1) {
            return true
        }
        return false
    }

    /**
     * Set the address window
     */
    function setAddrWindow(x0: number, y0: number, x1: number, y1: number): void {

        if (outOfBounds(x0, y0, x1, y1)) {
            return
        }
        // set the column
        //tftCom(TftCom.CASET, [0x00, x0 + 2, 0x00, x1 + 2]) // 2 is an adjust for thr AdaFruit 1.44 display
        tftCom(TftCom.CASET, [x0 >> 8, x0, x1 >> 8, x1])
        // set the row
        //tftCom(TftCom.RASET, [0x00, y0 + 3, 0x00, y1 + 3]) // 3 is an adjust for thr AdaFruit 1.44 display
        tftCom(TftCom.RASET, [y0 >> 8, y0, y1 >> 8, y1])
    }

    /**
     * Write a command to the TFT display
     */
    function tftCom(command: TftCom, params: Array<number>): void {

        // handle the pseudo 'DELAY' command - provides a delay in milliseconds
        if (command == TftCom.DELAY) {
            let waitTime: number = 500
            if (params.length == 1) {
                waitTime = params[0]
            }
            basic.pause(waitTime)
            return
        }

        // select the TFT controller
        pins.digitalWritePin(CS, 0) // select the TFT as SPI target
        // let the TFT know we're sending a command (rather than data)
        pins.digitalWritePin(DC, 0) // command/data = command

        pins.spiWrite(command)

        // let the TFT know we're sending data bytes (rather than a command)
        pins.digitalWritePin(DC, 1) // command/data = data

        for (let dataItem of params) {
            pins.spiWrite(dataItem)
        }

        // de-select the TFT controller
        pins.digitalWritePin(CS, 1) // de-elect the TFT as SPI target
    }

    /**
     * Do initial set up for display. (Required before any drawing begins.)
     */
    function tftSetup_ST7735(): void {

        // General Setup (for various display types)

        // 1. Software Reset
        tftCom(TftCom.SWRESET, [1])
        tftCom(TftCom.DELAY, [1])
        tftCom(TftCom.SWRESET, [0])
        tftCom(TftCom.DELAY, [1])
        tftCom(TftCom.SWRESET, [1])
        tftCom(TftCom.DELAY, [120]) // we need ot wait at least 120ms

        // 2. Exit Sleep Mode
        tftCom(TftCom.SLPOUT, [])
        tftCom(TftCom.DELAY, [120]) // we need to wait at least 120ms

        // 3. Frame rate ctrl - normal mode
        tftCom(TftCom.FRMCTR1, [0x01, 0x2C, 0x2D])

        // 4. Frame rate ctrl - idle mode
        tftCom(TftCom.FRMCTR2, [0x01, 0x2C, 0x2D])

        // 5. Frame rate ctrl - dot inversion mode
        tftCom(TftCom.FRMCTR3, [0x01, 0x2C, 0x2D, 0x01, 0x2C, 0x2D])

        // 6. Display inversion ctrl - no inversion
        tftCom(TftCom.INVCTR, [0x07])

        // 7. Power Control -4.6v, Auto Mode
        tftCom(TftCom.PWCTR1, [0xA2, 0x02, 0x84])

        // 8. Power control,VGH25 = 2.4C VGSEL = -10 VGH = 3 * AVDD
        tftCom(TftCom.PWCTR2, [0xC5])

        // 9: Power control, Opamp current small + Boost Frequency
        tftCom(TftCom.PWCTR3, [0x0A, 0x00])

        // 10: Power control, BCLK/2, Opamp current small & Medium low
        tftCom(TftCom.PWCTR4, [0x8A, 0x2A])

        // 11: Power control
        tftCom(TftCom.PWCTR5, [0x8A, 0xEE])

        // 12: Power control
        tftCom(TftCom.VMCTR1, [0x0E])

        // 13. Don't invert display
        //tftCom(TftCom.INVOFF, [])

        // 14: Memory access control (directions)
        tftCom(TftCom.MADCTL, [0xC0])

        // Further General Setup (for various display types)

        //1: Gamma Correction
        tftCom(TftCom.GMCTRP1, [0x0F, 0x1A, 0x0F, 0x18, 0x2F, 0x28, 0x20, 0x22, 0x1F, 0x1B, 0x23, 0x37, 0x00, 0x07, 0x02, 0x10])

        //2: Gamma Correction
        tftCom(TftCom.GMCTRN1, [0x0F, 0x1B, 0x0F, 0x17, 0x33, 0x2C, 0x29, 0x2E, 0x30, 0x30, 0x39, 0x3F, 0x00, 0x07, 0x03, 0x10])

        // 3: set color mode, 16-bit colour
        tftCom(TftCom.COLMOD, [0x05])

        // 4: Main screen turn on
        tftCom(TftCom.DISPON, [])
    }

    /**
     * Do initial set up for display. (Required before any drawing begins.)
     */

    function tftReset_ILI9431(): void {

        // Reset for ILI9431
        tftCom(TftCom.DELAY, [200])
        pins.digitalWritePin(RS, 1)
        tftCom(TftCom.DELAY, [200])
        pins.digitalWritePin(RS, 0)
        tftCom(TftCom.DELAY, [200])
        // we need ot wait at least 120ms

    }


    function tftSetup_ILI9341(): void {

        tftReset_ILI9431()

        // General Setup (for various display types)
        tftCom(TftCom.SLPOUT, [])

        //power control B
        tftCom(TftCom.PWCTRB, [0x00, 0xC1, 0x30])

        //power on sequence control
        tftCom(TftCom.POSEQ, [0x64, 0x03, 0x12, 0x81])

        //driver timing control A
        tftCom(TftCom.DTCTRA, [0x85, 0x00, 0x79])

        //power control A
        tftCom(TftCom.PWCTRA, [0x39, 0x2C, 0x00, 0x34, 0x02])

        //pump ratio control
        tftCom(TftCom.PMPRTO, [0x20])

        //driver timing control B
        tftCom(TftCom.DTCTRB, [0x00, 0x00])

        //power control,VRH[5:0]
        tftCom(TftCom.PWCTR1, [0x1D])

        //Power control,SAP[2:0];BT[3:0]
        tftCom(TftCom.PWCTR2, [0x12])

        //vcm control
        tftCom(TftCom.VMCTR1, [0x33, 0x3F])

        //vcm control 2
        tftCom(TftCom.VMCTR2, [0x92])

        //pixel format
        tftCom(TftCom.COLMOD, [0x55])

        //memory access control
        tftCom(TftCom.MADCTL, [0x08])

        //frameration control,normal mode full colours
        tftCom(TftCom.FRMCTR1, [0x00, 0x12])

        //display function control
        tftCom(TftCom.DFCTL, [0x0A, 0xA2])

        tftCom(TftCom.STSL, [0x02])

        //3gamma function disable
        tftCom(TftCom.GAMFUN, [0x00])

        //gamma curve selected
        tftCom(TftCom.GMCRV, [0x01])

        //1: Gamma Correction

        //2: Gamma Correction
        //set positive gamma correction
        tftCom(TftCom.GMCTRP1, [0x0F, 0x022, 0x1C, 0X1B, 0X08, 0X0F, 0X48, 0XB8, 0X34, 0X06, 0X0C, 0X09, 0X0F, 0X07, 0X00])

        //set negative gamma correction
        tftCom(TftCom.GMCTRN1, [0x00, 0x23, 0x24, 0x07, 0x10, 0x07, 0x38, 0x47, 0x4B, 0x0A, 0x13, 0x06, 0x30, 0x38, 0x0F])

        //display on
        tftCom(TftCom.DISPON, [])
    }

    /**
     * Draw a line of a given colour
     */
    //% blockId="TFT_drawLine" block="drawLine on x0:%x0|y0:%y0|x1:%x1|y1:%y1|colour:%colour"
    //% weight=97
    export function drawLine(x0: number, y0: number, x1: number, y1: number, colour: number): void {
        let xDelta = x1 - x0
        let yDelta = y1 - y0

        if (Math.abs(yDelta) > Math.abs(xDelta)) {
            let ySteps = Math.abs(yDelta / displayScale())
            let xIncrement = xDelta == 0 ? 0 : xDelta / ySteps
            let yIncrement = yDelta > 0 ? displayScale() : -1 * displayScale()

            let x = x0
            let y = y0;
            for (let steps = 0; steps <= ySteps; steps++) {
                drawPixel(roundedPixel(x), roundedPixel(y), colour)
                x = x + xIncrement
                y = y + yIncrement
            }
            return
        }

        let xSteps = Math.abs(xDelta / displayScale())
        let yIncrement = yDelta == 0 ? 0 : yDelta / xSteps;
        let xIncrement = xDelta > 0 ? displayScale() : -1 * displayScale()

        let y = y0;
        let x = x0
        for (let steps = 0; steps <= xSteps; steps++) {
            drawPixel(roundedPixel(x), roundedPixel(y), colour)
            y = y + yIncrement
            x = x + xIncrement
        }
    }

    /**
     * Draw a single pixel of a given colour
     */
    //% blockId="TFT_drawPixel" block="drawPixel on x:%x|y:%y|colour:%colour"
    //% weight=98
    export function drawPixel(x: number, y: number, colour: number): void {
        if (outOfBounds(x, y)) {
            return
        }

        setAddrWindow(x, y, x + 1, y + 1);
        // send data (16 bits in two bytes)
        tftCom(TftCom.RAMWR, [colour >> 8, colour])
    }

    /**
     * Fill a rectangle with a given colour
     */
    //% blockId="TFT_fillRect" block="fillRect on x:%x|y:%y|width:%width|height:%height|colour:%colour"
    //% weight=96
    export function fillRect(x: number, y: number, width: number, height: number, colour: number): void {

        if (outOfBounds(x, y)) {
            return;
        }

        if ((x + width) > screen_x) {
            width = screen_x - x;
        }

        if ((y + height) > screen_y) {
            height = screen_y - y;
        }

        let hiColour = (colour >> 8) % 256;
        let loColour = colour % 256;

        setAddrWindow(x, y, x + width - 1, y + height - 1);

        // we are going to manually implement the RAMWR command here because
        // we have custom parameters. See comments in tftCom for details
        // of what's going on here.
        pins.digitalWritePin(DC, 0); // command/data = command
        pins.digitalWritePin(CS, 0); // select the TFT as SPI target
        pins.spiWrite(TftCom.RAMWR);
        pins.digitalWritePin(DC, 1); // command/data = data

        for (let indexY = height; indexY > 0; indexY--) {
            for (let indexX = width; indexX > 0; indexX--) {
                pins.spiWrite(hiColour)
                pins.spiWrite(loColour)
            }
        }

        pins.digitalWritePin(CS, 1) // de-elect the TFT as SPI target
        pins.digitalWritePin(DC, 0) // command/data = command
    }

    /**
     * Fill a rectangle with a given colour
     */
    //% blockId="TFT_randomFillRect" block="fillRect on x:%x|y:%y|width:%width|height:%height| with random color"
    //% weight=96
    export function randomFillRect(x: number, y: number, width: number, height: number): void {

        if (outOfBounds(x, y)) {
            return;
        }

        if ((x + width) > screen_x) {
            width = screen_x - x;
        }

        if ((y + height) > screen_y) {
            height = screen_y - y;
        }

        setAddrWindow(x, y, x + width - 1, y + height - 1);

        // we are going to manually implement the RAMWR command here because
        // we have custom parameters. See comments in tftCom for details
        // of what's going on here.
        pins.digitalWritePin(DC, 0); // command/data = command
        pins.digitalWritePin(CS, 0); // select the TFT as SPI target
        pins.spiWrite(TftCom.RAMWR);
        pins.digitalWritePin(DC, 1); // command/data = data

        for (let indexY = height; indexY > 0; indexY--) {
            for (let indexX = width; indexX > 0; indexX--) {
                pins.spiWrite(Math.randomRange(0, 255))
                pins.spiWrite(Math.randomRange(0, 255))
            }
        }

        pins.digitalWritePin(CS, 1) // de-elect the TFT as SPI target
        pins.digitalWritePin(DC, 0) // command/data = command
    }


    /**
     * show text in LCD
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param s is the text will be show, eg: 'Hello!'
     * @param fontColor is string color
     * @param bgColor is background color
     */
    //% blockId="TFT_string" block="show string at x %x|y %y|text %s|fontColor %fontColor|bgColor %bgColor|zoom %zoom"
    export function showString(x: number, y: number, s: string, fontColor: number, bgColor: number, zoom: boolean) {

        let p = 0
        let fontHiColour = (fontColor >> 8) % 256;
        let fontLoColour = fontColor % 256;
        let bgHiColour = (bgColor >> 8) % 256;
        let bgLoColour = bgColor % 256;
        let zoomFactor = 1
        let index = 0
        let colsel = 0
        if (zoom)
            zoomFactor = 2

        for (let n = 0; n < s.length; n++) {

            p = font[s.charCodeAt(n)]

            setAddrWindow(x + n * 5 * zoomFactor, y, x + n * 5 * zoomFactor + 5 * zoomFactor - 1, y + 5 * zoomFactor - 1);

            pins.digitalWritePin(DC, 0); // command/data = command
            pins.digitalWritePin(CS, 0); // select the TFT as SPI target
            pins.spiWrite(TftCom.RAMWR);
            pins.digitalWritePin(DC, 1); // command/data = data

            for (let indexY = 0; indexY < 5; indexY++) {
                for (let a = 0; a < zoomFactor; a++) {
                    for (let indexX = 0; indexX < 5; indexX++) {
                        index = indexY + indexX * 5
                        colsel = (p & (1 << index))
                        for (let b = 0; b < zoomFactor; b++) {

                            if (colsel) {

                                pins.spiWrite(fontHiColour)
                                pins.spiWrite(fontLoColour)
                            }
                            else {

                                pins.spiWrite(bgHiColour)
                                pins.spiWrite(bgLoColour)
                            }
                        }
                    }
                }
            }

            pins.digitalWritePin(CS, 1) // de-elect the TFT as SPI target
            pins.digitalWritePin(DC, 0) // command/data = command
        }
    }

    /**
     * show a number in LCD
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param num is the number will be show, eg: 12
     * @param fontColor is string color
     * @param bgColor is background color
     */
    //% blockId="TFT_number" block="show a Number at x %x|y %y|number %num|fontColor %fontColor|bgColor %bgColor|zoom %zoom"
    export function showNumber(x: number, y: number, num: number, fontColor: number, bgColor: number, zoom: boolean) {
        showString(x, y, num.toString(), fontColor, bgColor, zoom)
    }

    /**
     * Set Scroll Area
     * @param top is scroll upper limit, eg: 0
     * @param bottom is scroll bottom limit, eg: 127
     */
    //% blockId="TFT_scrollSet" block="Set Scroll Between top %top|bottom %bottom"
    export function setScroll(top: number, bottom: number) {

        scroll_top = top
        scroll_area = bottom - top
        bottom = 160 - top - scroll_area
        tftCom(TftCom.SCLDEF, [top >> 8, top, scroll_area >> 8, bottom, bottom >> 8, bottom])
    }

    /**
     * Do Scroll
     * @param amount is scroll amount, eg: 1
     */
    //% blockId="TFT_doScroll" block="Do Scroll for amount %amount pixels"
    export function doScroll(amount: number) {

        amount = (amount + scroll_top) % scroll_area
        tftCom(TftCom.SCLAMT, [amount >> 8, amount])
    }


    /**
     * Setup and clear screen ready for used
     */
    //% blockId="TFT_setupScreen" block="setupScreen width:%x height:%y model:%_model MOSI:%MOSI SCK:%SCK CS:%CS DC:%DC RS:%RESET"
    //% x.defl=128
    //% y.defl=160
    //% _model.defl=DISPLAY_CONTROLLER.ST7735
    //% MOSI.defl=DigitalPin.P14
    //% SCK.defl=DigitalPin.P13
    //% _CS.defl=DigitalPin.P10
    //% _DC.defl=DigitalPin.P15
    //% _RESET.defl=DigitalPin.P16
    //% weight=99
    export function setupScreen(x: number = 240, y: number = 320, _model: DISPLAY_CONTROLLER, MOSI: DigitalPin = DigitalPin.P15, SCK: DigitalPin = DigitalPin.P13, _CS: DigitalPin = DigitalPin.P16, _DC: DigitalPin = DigitalPin.P9, _RESET: DigitalPin = DigitalPin.P8): void {
        screen_x = x
        screen_y = y
        model = _model
        CS = _CS
        DC = _DC
        RS = _RESET

        pins.digitalWritePin(RS, 1)
        pins.spiPins(MOSI, DigitalPin.P14, SCK)
        pins.spiFrequency(4000000) // try a fast rate for serial bus

        if (model == DISPLAY_CONTROLLER.ILI9341)
            tftSetup_ILI9341()
        else if (model == DISPLAY_CONTROLLER.ST7735)
            tftSetup_ST7735()

        clearScreen()
    }

    /**
    * Clear screen
    */
    //% blockId="TFT_clearScreen" block="clearScreen"
    //% weight=95
    export function clearScreen(): void {
        fillRect(
            0,
            0,
            screen_x,
            screen_y,
            0
        )
    }

    /**
    * Get Color
    */
    //% blockId=Get_Color
    //% blockGap=8
    //% block="%color"
    //% weight=94
    export function Get_Color(color: COLOR): number {
        return color;
    }
}
