let data3 = 0
let data2 = 0
let data1 = 0
let id = 1
S4comms.init(id, 5000)
basic.showIcon(IconNames.Surprised)
basic.forever(function () {
    basic.showString(".")
    data1 = input.lightLevel()
    data2 = input.compassHeading()
    data3 = input.soundLevel()
    S4comms.downlink(input.temperature(), data1, data2, data3)
    basic.pause(100)
    basic.clearScreen()
    basic.pause(200)
})
