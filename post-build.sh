#!/bin/bash
# Post-build script to copy build output to where the server expects it

echo "Copying build output to server-dist/public..."

# Create the directory if it doesn't exist
mkdir -p server-dist/public

# Copy the built files
cp -r dist/public/* server-dist/public/

echo "Build output copied successfully!"
