# BBC Micro:Bit IR remote demo

## Motivation

Together with a 10 year old child, I was playing around with the BBC micro:bit.
I showed him some basic stuff, we programmed a bit and finally we connected a led.
After we had programmed the micro:bit to let the led blink, the child asked whether one could also build a remote with the micro:bit.
It had noticed that a TV remote has also a led.

I started wondering myself.
Of course the micro:bit should be able to run a IR remote, if programmed low level.
I wondered however if one can get the timing precise and fast enough with one of the high level languages.
Therefore, I played around with PXT and Samsung IR codes.
While the timing is tricky, I got a high-level program I can explain and which is still good enough to mostly work.
While not perfect, it is definitely good enough for explaining IR remotes to a child.

There a two programs in the project.
`ir-send.hex` sends Samsung commands via a IR remote.
It can turn on and off a TV and change the volume.
`ir-receive.hex` uses a 38 kHz IR receiver to receive some Samsung IR codes.


## Parts needed

- IR led (940 nm)
- 2 led in colors of your choice
- 38 kHz IR receiver
- appropriate resistors for leds

## Description of Samsung Protocol

Samsung IR codes consist of a start code, 32 codes for bits and an end code.
Each of these codes consists of the led being turned on for a certain amount of time and then off.
While being turned on, the led should actually be turned on and off with 38 kHz.
This means that 13 µs it should be turned on and then turned off for 13 µs.
This repeats for the whole *on* time.

The start code is encoded by 4500 µs being turned on and 4500 µs being turned off.
A one bit is encoded by 550 µs begin turned on and 1600 µs being turned off.
A zero bit is encoded by 550 µs begin turned on and just 530 µs being turned off.
Finally, the end code is encoded by 550 µs being turned off followed by being turned off for at least 4500 µs.

## Description of `ir-send`

For showing sending IR-codes, load the program `ir-send.hex` on your micro:bit.
Connect the IR led to pin 0.
There are 3 codes for Samsung TVs that can be send.
Use button B to switch between `turn on/off`, `volume up` and `volume down`.
Button A sends the currently selected code.

In order to demonstrate what actually happens, it might be good to connect a visible led instead of an IR one.
An alternative is to observe the led with some camera like e.g. a webcam.
Pressing buttons A + B together switches demo mode.
In demo mode, everything is slowed down by a factor of 200.


## Description of `ir-receive`

`ir-receive` tests reading Samsung IR-codes.
It expects a 38 kHz IR receiver (like a TSOP34438 or VS1838B) connected to pin 2.
Pressing key `1` on a Samsung TV remote will turn on an led connected to pin 1.
Key `2` will turn it off.
The volume up and down keys control the brightness of a led connected to pin 0.


## How I used the code

I looked at an led TV remote with a webcam. We saw that it emits
light. I explained that humans can't see IR light, but cameras can.
I explained that IR remotes work by just turning IR leds quickly on
and off. We programmed a red led to blink. Then we replaced it with
an IR led and looked at it with the webcam again.

I then explained how complicated Samsung IR codes actually are.
I presented the ready code and we played around with it with both a IR led and a green led.
It worked fine with my Samsung TV, but only from short distances (about 2 m maximum).
To increase the distance I explained that we need more power for the led.
I briefly showed how to increase distance by using a transistor and an external power source instead of connecting the IR led directly to pin 0.
We then build a TV-B-Gone universal remote (we had practiced soldering before).
