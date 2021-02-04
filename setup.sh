#!/usr/bin/bash

# Download the Imgur Repo
git clone https://github.com/Twiggeh/ImgurClone

# Install Dependencies Imgur Clone
cd ./ImgurClone/

./setup.sh

# Install Dependencies Portfolio
cd ../

yarn install

cd ../client

yarn install

echo "Done :D"
