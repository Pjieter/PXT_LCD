//% block="LCD"
namespace LCD {
    let cs: DigitalPin;
    let dc: DigitalPin;
    let rst: DigitalPin;

    function spiWrite(data: number) {
        pins.spiWrite(data);
    }

    function lcdCommand(cmd: number) {
        pins.digitalWritePin(dc, 0); // Command mode
        pins.digitalWritePin(cs, 0); // Select the LCD
        spiWrite(cmd);
        pins.digitalWritePin(cs, 1); // Deselect the LCD
    }

    function lcdData(data: number) {
        pins.digitalWritePin(dc, 1); // Data mode
        pins.digitalWritePin(cs, 0); // Select the LCD
        spiWrite(data);
        pins.digitalWritePin(cs, 1); // Deselect the LCD
    }

    function lcdInit() {
        pins.digitalWritePin(rst, 0);
        basic.pause(100);
        pins.digitalWritePin(rst, 1);
        basic.pause(100);

        // Initialization commands for the LCD
        lcdCommand(0x01); // Software reset
        basic.pause(150);
        lcdCommand(0x11); // Exit sleep mode
        basic.pause(150);
        lcdCommand(0x29); // Display on

        // Additional initialization commands
        lcdCommand(0xC0); // Power control
        lcdData(0x1D); // VRH[5:0]
        lcdCommand(0xC1); // Power control
        lcdData(0x12); // SAP[2:0];BT[3:0]
        lcdCommand(0xC5); // VCM control
        lcdData(0x33);
        lcdData(0x3F);
        lcdCommand(0xC7); // VCM control
        lcdData(0x92);
        lcdCommand(0x3A); // Memory Access Control
        lcdData(0x55);
        lcdCommand(0x36); // Memory Access Control
        lcdData(0x08);
        lcdCommand(0xB1);
        lcdData(0x00);
        lcdData(0x12);
        lcdCommand(0xB6); // Display Function Control
        lcdData(0x0A);
        lcdData(0xA2);
        lcdCommand(0x44);
        lcdData(0x02);
        lcdCommand(0xF2); // 3Gamma Function Disable
        lcdData(0x00);
        lcdCommand(0x26); // Gamma curve selected
        lcdData(0x01);
        lcdCommand(0xE0); // Set Gamma
        lcdData(0x0F);
    }

    //% blockId=LCD_setPins block="set LCD pins CS %csPin DC %dcPin RST %rstPin"
    export function setPins(csPin: DigitalPin, dcPin: DigitalPin, rstPin: DigitalPin) {
        cs = csPin;
        dc = dcPin;
        rst = rstPin;
        pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13);
        pins.spiFormat(8, 0); // 8 bits per transfer, mode 0
        pins.spiFrequency(1000000); // 1 MHz
        lcdInit();
    }

    //% blockId=LCD_drawPoint block="draw point at x %x y %y color %color"
    export function drawPoint(x: number, y: number, color: number) {
        setCursor(x, y);
        writeDataWord(color);
    }

    function setCursor(x: number, y: number) {
        lcdCommand(0x2A); // Column addr set
        lcdData(x >> 8);
        lcdData(x & 0xFF);
        lcdCommand(0x2B); // Row addr set
        lcdData(y >> 8);
        lcdData(y & 0xFF);
        lcdCommand(0x2C); // Memory write
    }

    function writeDataWord(color: number) {
        lcdData(color >> 8);
        lcdData(color & 0xFF);
    }
}
