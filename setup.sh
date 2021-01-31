#!/usr/bin/bash

# Download the Imgur Repo
git clone https://github.com/Twiggeh/ImgurClone

# Install Dependencies Imgur Clone
cd ./ImgurClone/client/

yarn install

cd ../server

yarn install


# Install Dependencies Portfolio
cd ../../server/

yarn install

cd ../client

yarn install

echo "Done :D"


