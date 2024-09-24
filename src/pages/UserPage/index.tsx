// import Button from "container/Button";
import useUser from "container/hooks/useUser";
import { useAppSelector } from "container/hooks/useAppSelector";
import React from "react";
const Loading = React.lazy(() => import("container/Loading"));

export default function UserPage() {
	const { handleLogin } = useUser();
	const { user } = useAppSelector((state) => state);

	console.log("user:", user);

	return (
		<div>
			<h1>INFO DO USUÁRIO LOGADO</h1>
			<br />
			<h1>Nome: {user.username}</h1>
			<br />
			<h1>Expiração token: {user.exp}</h1>
		</div>
	);
}
