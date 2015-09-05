#!/bin/bash

adb shell mkdir /sdcard/MissCity
cd build
for i in `ls .`; do
	adb push $i /sdcard/MissCity/$i
done
