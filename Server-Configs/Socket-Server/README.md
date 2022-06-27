![Logo](https://drive.google.com/uc?id=1DLNaICEW3G2hWcvZ7L6fD707nVMqvGi7)

# KanbanWarriors Socket.io Server

Welcome everyone to our Socket.io repository! Feel free to follow instructions below if you would like to try out our web app in your local machine

## Prerequisites (Skip if you have already installed)

-   [Node.js](https://nodejs.org/en/) -> Nodejs (LTS) is required for Node package manager for socket.io server to work
-   [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) -> For cloning repository
-   [Github Desktop](https://desktop.github.com/) -> to clone repo easily

## Run Locally

Clone the project (Skip this step if you have already cloned our project before)

```bash
  git clone https://github.com/Acerizm/KanbanWarriors-Orbital.git
```

Navigate to our socket.io server codebase (assuming you are at the Github folder)

-   Example: C:\Users\acehq\Documents\GitHub\KanbanWarriors-Orbital\Server-Configs\Socket-Server>

```bash
  cd ./KanbanWarriors-Orbital/Server-Configs/Socket-Server
```

Install Dependencies

```bash
  npm install
```

Run the socket.io server

```bash
  npm start
```

Stop the socket.io server

```bash
  CTRL+C on the terminal/CMD
```

## For Testing Connection To Local Socket.io Server

Navigate to our socket.io client in the front-end (if using cmd)

-   Example: C:\Users\acehq\Documents\GitHub\KanbanWarriors-Orbital\front-end\src\Components\SocketClient>

```bash
  cd ./KanbanWarriors-Orbital/front-end/src/Components/SocketClient
```

Or

Navigate to our socket.io client in the front-end (using your own IDE)

```bash
  path: KanbanWarriors-Orbital -> front-end-> src-> Components -> SocketClient -> index.js
```

Edit Index.js file to switch to your local socket.io server instead of the live server

```jsx
import io from "socket.io-client";

// for production
// export const socket = io.connect("http://159.223.91.154:4000");

// for development
export const socket = io.connect("http://localhost:4000");
```
