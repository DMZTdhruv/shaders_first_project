import React, { type MouseEvent, useEffect, useRef } from "react";

import { useMotionValue } from "framer-motion";

type TUseMouse = {
	radius?: number;
};

const useMouse = ({ radius }: TUseMouse) => {
	const mouse = {
		y: useMotionValue(0),
		x: useMotionValue(0),
	};

	useEffect(() => {
		const mouseMove = (e: WindowEventMap["mousemove"]) => {
			const { pageX, pageY } = e;
			mouse.x.set(pageX - (radius ? radius : 0));
			mouse.y.set(pageY - (radius ? radius : 0));
		};

		window.addEventListener("mousemove", mouseMove);
		return () => window.removeEventListener("mousemove", mouseMove);
	}, [mouse.x.set, mouse.y.set, radius]);

	return mouse;
};

export default useMouse;
