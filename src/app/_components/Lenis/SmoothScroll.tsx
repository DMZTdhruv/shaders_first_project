"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
	return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
