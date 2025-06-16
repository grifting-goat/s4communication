/**
 * These should be the blocks required for students to interact with the s4
 * by MakeCode
 */

//% color="#4beb36"
namespace S4comms {
    let default_channel = 23
    let default_power = 7
    let student_id = 0xFF
    let payloadInterval = 10000
    let intervalTime = input.runningTime()

    /**
     * Helper function to build the packets we want to send to master micro:bit
     * 
     */
    function constructPacket(id: number, temp: number, data1: number, data2: number, data3: number): Buffer {
        let packet = pins.createBuffer(8)

        //single byte id and temp
        packet.setNumber(NumberFormat.UInt8LE, 0, id)  // Byte 0
        packet.setNumber(NumberFormat.Int8LE, 1, temp)        // Byte 1

        //3 2 byte shorts
        packet.setNumber(NumberFormat.Int16LE, 2, data1)        // Byte 2-3
        packet.setNumber(NumberFormat.Int16LE, 4, data2)        // Byte 4-5
        packet.setNumber(NumberFormat.Int16LE, 6, data3)        // Byte 6-7

        return packet
    }


    /**
     * This should be placed in the start up section
     */
    //% block
    export function init(id : number, frequency : number) {
        payloadInterval = frequency
        student_id = id
        radio.setTransmitPower(default_power)
        radio.setFrequencyBand(default_channel)
        radio.on()
    }

    /**
     * This should be placed within your main loop
     */
    //% block
    export function downlink(id: number, temp: number, data1: number, data2: number, data3: number) {

        if (input.runningTime() - intervalTime >= payloadInterval) {
            let packet = constructPacket(id, temp, data1, data2, data3)
            radio.sendBuffer(packet)

            intervalTime = input.runningTime()
        }
        
    }
}
