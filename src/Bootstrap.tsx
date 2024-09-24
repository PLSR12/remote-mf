import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOMClient from "react-dom/client";

import Router from "./App";
import StoreProvider from "container/providers/StoreProvider";

const container = document.getElementById("remote-app");
const root = ReactDOMClient.createRoot(container!);

root.render(
	<StrictMode>
		<StoreProvider>
			<BrowserRouter basename="remote">
				<Router />
			</BrowserRouter>
		</StoreProvider>
	</StrictMode>
);
