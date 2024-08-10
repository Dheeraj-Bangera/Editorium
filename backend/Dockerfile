FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory in the container
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install essential tools and multiple programming languages
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    git \
    vim \
    bash \
    openjdk-17-jdk \
    python3 \
    python3-pip \
    ruby \
    ruby-dev \
    golang \
    php \
    default-jdk \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install global packages for creating boilerplate projects
RUN npm install -g create-react-app @vue/cli create-vite@latest create-next-app express-generator

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create the /user directory
RUN mkdir /app/user

# Expose the port the app runs on
EXPOSE 9000

# Create a startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Set the command to run the app using the startup script
CMD ["/start.sh"]