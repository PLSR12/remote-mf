/* eslint-disable */
/// <reference types="react" />

declare module "container/Button" {
	import { Button as ButtonAntD, ButtonProps } from "antd";

	function Button({ children, ...buttonProps }: ButtonProps): React.JSX.Element;
	export default Button;
}

declare module "container/Loading" {
	import { SpinProps } from "antd/es/spin";

	function Loading({ ...props }: SpinProps): React.JSX.Element;
	export default Loading;
}

declare module "container/hooks/useUser" {
	function useUser(): {
		user: {
			id: string;
			username: string;
			iat: number;
			exp: number;
		};
		handleLogin: ({
			name,
			password,
		}: {
			name: string;
			password: string;
		}) => void;
	};

	export default useUser;
}

declare module "container/types/storeState" {
	export interface IUser {
		id: string;
		username: string;
		iat: number;
		exp: number;
	}
	export interface UserState {
		user: IUser;
	}
}

declare module "container/hooks/useAppSelector" {
	import type { IUser } from "container/types/storeState";
	export type RootState = {
		user: IUser;
	};

	export interface TypedUseSelectorHook<TState> {
		<TSelected>(selector: (state: TState) => TSelected): TSelected;
		<Selected = unknown>(selector: (state: TState) => Selected): Selected;
	}

	export const useAppSelector: TypedUseSelectorHook<RootState>;
}

declare module "container/providers/StoreProvider" {
	import React from "react";

	type Props = {
		children: React.ReactNode;
	};
	export default function StoreProvider({ children }: Props): JSX.Element;
}
