#!/bin/bash

# Find and kill the running process
pkill -f "ts-node-dev"

# Wait for a few seconds to allow the process to terminate properly
sleep 5

# Restart the application
nohup ts-node-dev --poll --transpileOnly --ignore-watch node_modules src/server.ts &
