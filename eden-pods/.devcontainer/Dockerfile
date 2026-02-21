FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

RUN apt-get update && \
    apt-get install -y --no-install-recommends openjdk-17-jre-headless && \
    npm install -g firebase-tools && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
