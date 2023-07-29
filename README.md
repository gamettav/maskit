# Webcam Face Mask App

This is a full-stack application that allows users to capture a photo using their laptop webcam and add a mask on their face in real-time using websockets. The app is built with React, Node.js and Websockets.

## Project Structure

The application is organized into two main folders:

1. **client**: Contains the front-end code.
2. **server**: Contains the back-end code.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/gamettav/maskit.git
```

2. Navigate to the project directory:

```bash
cd maskit
```

3. Install the dependencies for both the client and server:

```bash
cd client
yarn

cd server
yarn
```

## Running the App

1. Start the server:

```bash
cd server
yarn run start
```

2. Start the client:

```bash
cd client
yarn run dev
```

The client will be available at http://localhost:3000, and the server will run on http://localhost:3001.

## How to Use

1. Open the client app in your web browser at http://localhost:3000.

2. Toggle the 'Camera' switcher to turn on the webcam and grant permission to use it.

3. Then choose a mask and click 'Capture and add mask' button.

4. The app will detect your face and overlay a mask on it using face-api.js and Jimp on the server-side.

5. Resulting will be visible below the camera container.

6. You can also save the image by clicking 'Save image' button.

## Technologies Used

### Client-Side:

-  React
-  Socket.IO
-  tensorflow-models (for face detection)

### Server-Side:

-  Node.js
-  Socket.IO
-  Jimp (for image processing and overlaying the mask)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
