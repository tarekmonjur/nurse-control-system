#!/bin/bash

mosquitto_passwd -D /mosquitto/etc/passwd tarek21
mosquitto_passwd -c /mosquitto/etc/passwd tarek21
mosquitto_passwd -b /mosquitto/etc/passwd tarek21 tarek21
mosquitto_passwd -U /mosquitto/etc/passwd


