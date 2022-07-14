import { io } from "socket.io-client";
import React from "react";

const SOCKET_URL = "https://mychatappbyvignesh.herokuapp.com";

export const socket = io(SOCKET_URL);

export const AppContext = React.createContext();