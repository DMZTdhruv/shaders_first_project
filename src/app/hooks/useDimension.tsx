import React, { useEffect, useState } from "react";

type TDimension = {
	width: number;
	height: number;
};

const useDimension = () => {
	const [dimension, setDimension] = useState<TDimension>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const resize = () => {
			const { innerWidth, innerHeight } = window;
			setDimension({
				width: innerWidth,
				height: innerHeight,
			});
		};
		resize();
		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, []);

	return dimension;
};

export default useDimension;
