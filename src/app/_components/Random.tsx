"use client";

import React, { useEffect } from "react";
import useMouse from "../hooks/useMouse";
import { motion, useSpring } from "framer-motion";

const Random = () => {
	const { x, y } = useMouse({ radius: 8 });
	return (
		<div className="relative h-[200vh] w-full bg-neutral-900">
			<motion.div
				className="absolute h-4 w-4 bg-white rounded-full"
				style={{
					x: useSpring(x, { stiffness: 100 }),
					y: useSpring(y, { stiffness: 100 }),
				}}
			/>
		</div>
	);
};

export default Random;
