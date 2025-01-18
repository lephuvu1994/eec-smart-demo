# Cập nhật hệ điều hành 
sudo apt update

sudo apt upgrade -y


# Cài đặt nodejs
sudo curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt-get install -y nodejs git make g++ gcc libsystemd-dev

# Verify that the correct nodejs and pnpm version has been installed
node --version  # Should output V18.x, V20.x, V22.X

npm --version  # Should output 9.X

# Cài đặt docker
curl -fsSL https://get.docker.com -o get-docker.sh

sudo sh get-docker.sh

# Cài đặt docker v2

## Thêm vào kho lưu trữ
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

## Sau đó cài đặt docker
sudo apt update

sudo apt install -y docker-ce docker-ce-cli containerd.io

## Kiểm tra cài dặt docker 
docker --version

## Chạy docker không cần sudo
sudo usermod -aG docker $USER

newgrp docker


# Cài đặt docker compose

sudo curl -L "https://github.com/docker/compose/releases/download/v2.27.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

## Kiểm tra cài đặt docker compose
docker compose --version

# Create a directory for eecsmarthome and set your user as owner of it


sudo mkdir /opt/eecsmarthome

sudo chown -R ${USER}: /opt/eecsmarthome

# Clone Zigbee2MQTT repository
git clone --depth 1 https://github.com/lephuvu1994/eec-smart-demo.git /opt/eecsmarthome


# Install dependencies (as user "pi")
cd /opt/eecsmarthome

npm i --frozen-lockfile


