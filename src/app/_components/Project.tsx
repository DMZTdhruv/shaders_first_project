import type { SetStateAction } from "react";
import { someList } from "../../../constants";
import type { TList } from "../../../types";

const Project = ({
	setActiveProject,
}: { setActiveProject: React.Dispatch<SetStateAction<TList | null>> }) => {
	const list = someList;
	return (
		<div className="h-screen w-full flex justify-center items-center p-4 gap-3">
			<ul
				className="flex-col flex gap-2"
				onMouseLeave={() => {
					setActiveProject(null);
				}}
			>
				{list.map((list) => (
					// biome-ignore lint/a11y/useKeyWithMouseEvents: <explanation>
					<li
						onMouseOver={() => setActiveProject(list)}
						key={list.id}
						className="flex flex-col max-w-5xl bg-neutral-800/50 backdrop-blur-lg py-4 px-4 rounded-xl"
					>
						<h3 className="text-[20px]">{list.name}</h3>
						<p className="text-[16px] opacity-70">{list.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Project;
