//% block="LCD"
namespace LCD {
    const LCD_WIDTH = 240;
    const LCD_HEIGHT = 320;
    let cs: DigitalPin;
    let dc: DigitalPin;
    let rst: DigitalPin;
    let clck: DigitalPin;
    let MOSI: DigitalPin;
    let MISO: DigitalPin;
    let BL: DigitalPin;

    function spiWrite(data: number) {
        pins.spiWrite(data);
    }

    function LCD_Write_Command(cmd: number) {
        pins.digitalWritePin(cs, 0); // Select the LCD
        pins.digitalWritePin(dc, 0); // Command mode
        spiWrite(cmd);
        pins.digitalWritePin(cs, 1); // Deselect the LCD
    }

    function LCD_WriteData_Byte(data: number) {
        pins.digitalWritePin(cs, 0); // Select the LCD
        pins.digitalWritePin(dc, 1); // Data mode
        spiWrite(data);
        pins.digitalWritePin(cs, 1); // Deselect the LCD
    }

    function lcdInit() {
        basic.pause(200);
        pins.digitalWritePin(rst, 0);
        basic.pause(200);
        pins.digitalWritePin(rst, 1);
        basic.pause(200);

        LCD_Write_Command(0x11); //Sleep out

        LCD_Write_Command(0xCF);
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(0xC1);
        LCD_WriteData_Byte(0X30);
        LCD_Write_Command(0xED);
        LCD_WriteData_Byte(0x64);
        LCD_WriteData_Byte(0x03);
        LCD_WriteData_Byte(0X12);
        LCD_WriteData_Byte(0X81);
        LCD_Write_Command(0xE8);
        LCD_WriteData_Byte(0x85);
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(0x79);
        LCD_Write_Command(0xCB);
        LCD_WriteData_Byte(0x39);
        LCD_WriteData_Byte(0x2C);
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(0x34);
        LCD_WriteData_Byte(0x02);
        LCD_Write_Command(0xF7);
        LCD_WriteData_Byte(0x20);
        LCD_Write_Command(0xEA);
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(0x00);
        LCD_Write_Command(0xC0); //Power control
        LCD_WriteData_Byte(0x1D); //VRH[5:0]
        LCD_Write_Command(0xC1); //Power control
        LCD_WriteData_Byte(0x12); //SAP[2:0];BT[3:0]
        LCD_Write_Command(0xC5); //VCM control
        LCD_WriteData_Byte(0x33);
        LCD_WriteData_Byte(0x3F);
        LCD_Write_Command(0xC7); //VCM control
        LCD_WriteData_Byte(0x92);
        LCD_Write_Command(0x3A); // Memory Access Control
        LCD_WriteData_Byte(0x55);
        LCD_Write_Command(0x36); // Memory Access Control
        LCD_WriteData_Byte(0x08);
        LCD_Write_Command(0xB1);
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(0x12);
        LCD_Write_Command(0xB6); // Display Function Control
        LCD_WriteData_Byte(0x0A);
        LCD_WriteData_Byte(0xA2);

        LCD_Write_Command(0x44);
        LCD_WriteData_Byte(0x02);

        LCD_Write_Command(0xF2); // 3Gamma Function Disable
        LCD_WriteData_Byte(0x00);
        LCD_Write_Command(0x26); //Gamma curve selected
        LCD_WriteData_Byte(0x01);
        LCD_Write_Command(0xE0); //Set Gamma
        LCD_WriteData_Byte(0x0F);
        LCD_WriteData_Byte(0x22);
        LCD_WriteData_Byte(0x1C);
        LCD_WriteData_Byte(0x1B);
        LCD_WriteData_Byte(0x08);
        LCD_WriteData_Byte(0x0F);
        LCD_WriteData_Byte(0x48);
        LCD_WriteData_Byte(0xB8);
        LCD_WriteData_Byte(0x34);
        LCD_WriteData_Byte(0x05);
        LCD_WriteData_Byte(0x0C);
        LCD_WriteData_Byte(0x09);
        LCD_WriteData_Byte(0x0F);
        LCD_WriteData_Byte(0x07);
        LCD_WriteData_Byte(0x00);
        LCD_Write_Command(0XE1); //Set Gamma
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(0x23);
        LCD_WriteData_Byte(0x24);
        LCD_WriteData_Byte(0x07);
        LCD_WriteData_Byte(0x10);
        LCD_WriteData_Byte(0x07);
        LCD_WriteData_Byte(0x38);
        LCD_WriteData_Byte(0x47);
        LCD_WriteData_Byte(0x4B);
        LCD_WriteData_Byte(0x0A);
        LCD_WriteData_Byte(0x13);
        LCD_WriteData_Byte(0x06);
        LCD_WriteData_Byte(0x30);
        LCD_WriteData_Byte(0x38);
        LCD_WriteData_Byte(0x0F);
        LCD_Write_Command(0x29); //Display on
    }

    //% blockId=LCD_setPins block="set LCD pins CS %csPin DC %dcPin RST %rstPin MOSI %MOSIPin MISO %MISOPin BL %BLPin clck %clckPin"
    export function setPins(csPin: DigitalPin, dcPin: DigitalPin, rstPin: DigitalPin, MOSIPin: DigitalPin, MISOPin: DigitalPin, clckPin: DigitalPin, BLPin: DigitalPin) {
        cs = csPin;
        dc = dcPin;
        rst = rstPin;
        MOSI = MOSIPin
        MISO = MISOPin
        BL = BLPin
        clck = clckPin
        pins.spiPins(MOSI, MISO, clck);
        pins.spiFormat(16, 3); // 8 bits per transfer, mode 0
        pins.spiFrequency(4000000); // 1 MHz
        lcdInit();
        pins.analogWritePin(BL, 100)
    }

    //% blockId=LCD_drawPoint block="draw point at x %x y %y color %color"
    export function drawPoint(x: number, y: number, color: number) {
        setCursor(x, y);
        LCD_WriteData_Word(color);
    }

    // //% blockId=LCD_drawImage block="draw image at x %xStart y %yStart with width %W_Image height %H_Image"
    // export function drawImage(xStart: number, yStart: number, W_Image: number, H_Image: number) {
    //     for (let j = 0; j < H_Image; j++) {
    //         for (let i = 0; i < W_Image; i++) {
    //             if (xStart + i < LCD_WIDTH && yStart + j < LCD_HEIGHT) { // Exceeded part does not display
    //                 let color = (image[j * W_Image * 2 + i * 2 + 1] << 8) | image[j * W_Image * 2 + i * 2];
    //                 setCursor(xStart + i, yStart + j);
    //                 LCD_WriteData_Word(color);
    //             }
    //         }
    //     }
    // }

    function setCursor(X: number, Y: number) {
        LCD_Write_Command(0x2a);
        LCD_WriteData_Byte(X >> 8);
        LCD_WriteData_Byte(X);
        LCD_WriteData_Byte(X >> 8);
        LCD_WriteData_Byte(X);

        LCD_Write_Command(0x2b);
        LCD_WriteData_Byte(Y >> 8);
        LCD_WriteData_Byte(Y);
        LCD_WriteData_Byte(Y >> 8);
        LCD_WriteData_Byte(Y);

        LCD_Write_Command(0x2C);
    }

    function LCD_SetWindow(Xstart: number, Ystart: number, Xend: number, Yend: number) {
        LCD_Write_Command(0x2a);
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(Xstart & 0xff);
        LCD_WriteData_Byte((Xend - 1) >> 8);
        LCD_WriteData_Byte((Xend - 1) & 0xff);

        LCD_Write_Command(0x2b);
        LCD_WriteData_Byte(0x00);
        LCD_WriteData_Byte(Ystart & 0xff);
        LCD_WriteData_Byte((Yend - 1) >> 8);
        LCD_WriteData_Byte((Yend - 1) & 0xff);

        LCD_Write_Command(0x2C);
    }

    function LCD_Clear(Color: number) {
        let i, j: number;
        LCD_SetWindow(0, 0, LCD_WIDTH, LCD_HEIGHT);
        pins.digitalWritePin(dc, 1);
        for (i = 0; i < LCD_WIDTH; i++) {
            for (j = 0; j < LCD_HEIGHT; j++) {
                pins.spiWrite((Color >> 8) & 0xff);
                pins.spiWrite(Color);
            }
        }
    }

    function LCD_WriteData_Word(data:number)
    {
        pins.digitalWritePin(cs, 0);
        pins.digitalWritePin(dc, 1);
        pins.spiWrite((data >> 8) & 0xff);
        pins.spiWrite(data);
        pins.digitalWritePin(cs, 1);
    }
}
