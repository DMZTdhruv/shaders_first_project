"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Model from "./Model";
import Project from "../Project";
import type { TList } from "../../../../types";

const Scene = () => {
	const [activeProject, setActiveProject] = useState<TList | null>(null);

	return (
		<div className="h-screen relative">
			<Canvas className="fixed h-screen w-full">
				<Model activeProject={activeProject} />
			</Canvas>
			<div className="absolute flex items-center top-0 justify-center h-screen flex-col w-full space-y-4 text-[23px]">
				<Project setActiveProject={setActiveProject} />
			</div>
		</div>
	);
};

export default Scene;
