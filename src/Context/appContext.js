import { io } from "socket.io-client";
import React from "react";

const SOCKET_URL = "https://chatapp-backend-five.vercel.app";

export const socket = io(SOCKET_URL);

export const AppContext = React.createContext();