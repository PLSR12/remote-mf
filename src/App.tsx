import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import UsersPage from "./pages/UsersPage";
const Loading = React.lazy(() => import("container/Loading"));

const Router = () => {
	return (
		<div>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path={"/"} element={<UsersPage />} />
					<Route path={"/user-page"} element={<UserPage />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default Router;
