import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import React from "react";
import NAVIGATION_CONSTANTS from "../../constants/navigation";
const Button = React.lazy(() => import("container/Button"));

function UsersPage() {
	const navigate = useNavigate();

	return (
		<Container>
			<h1>Usuários</h1>
			<br />
			<Button
				style={{ background: "red", color: "white" }}
				onClick={() => {
					navigate(NAVIGATION_CONSTANTS.USER_PAGE);
				}}
			>
				Dados do usuário Admin
			</Button>
		</Container>
	);
}

export default UsersPage;
