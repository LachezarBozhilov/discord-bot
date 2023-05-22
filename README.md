# Discord OCR bot

## Introduction

Discord bot that leverages Optical Character Recognition (OCR) technology using tesseract.js . This innovative bot revolutionizes the way text is extracted from messages, allowing seamless conversion of images or scanned documents into readable text right within your Discord server.

With just a few simple commands, you can now effortlessly transcribe text from various sources and share it with your server members, enhancing communication and information sharing like never before.

## Key Features

- **OCR Text Extraction:** The bot can swiftly analyze and extract text from images and scanned documents shared in Discord channels, including handwritten text and printed materials.
- **Real-Time Message Output:** The extracted text is instantly presented as a new message, ensuring swift communication and seamless integration with ongoing discussions.
- **Multiple Language Support:** Tesseract.js supports a wide range of languages, enabling users to extract text from diverse sources in different languages effortlessly.


## How to run it

1. Enter your discord token in config.json located in the main folder of the project 

```json
{
  "token": "token_provided_from_discord_developer_website"
}
```

2. yarn deploy-commands

- initiate this commad to deploy you commants from commands folder to the bot

3. Start the bot

- yarn run

### Using docker

docker-compose docker/docker-compose.yaml up

