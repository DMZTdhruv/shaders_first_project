import useMouse from "@/app/hooks/useMouse";
import React, { act, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion-3d";
import useDimension from "@/app/hooks/useDimension";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { someList } from "../../../../constants";
import type { TList } from "../../../../types";

const vertex = `
	varying vec2 v_uv;
	uniform vec2 u_delta;
	float PI = 3.14159265359;


	void main() {
		v_uv = uv;
		vec3 new_position = position;
		new_position.x += sin(uv.y * PI) * u_delta.x * 0.0010;
		new_position.y += sin(uv.x * PI) * u_delta.y * -0.0010;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position,1.0);
	}
`;

//finally xD
const fragment = `
	varying vec2 v_uv;
	uniform sampler2D u_texture;

	void main() {
		vec4 texture = texture2D(u_texture, v_uv);
		gl_FragColor = texture;
	}
`;

const Model = ({ activeProject }: { activeProject: TList | null }) => {
	const textures = useTexture(someList.map((list) => list.image));

	const meshRef = useRef(null);
	// some required custom - hooks
	const mouse = useMouse({});
	const dimension = useDimension();

	const { viewport } = useThree();
	const uniform = useRef({
		u_texture: { value: textures[0] },
		u_delta: { value: { x: 0, y: 0 } },
	});

	const smoothValue = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
	useFrame(() => {
		const { x, y } = mouse;
		if (meshRef.current) {
			//@ts-ignore
			meshRef.current.material.uniforms.u_delta.value = {
				x: x.get() - smoothValue.x.get(),
				y: y.get() - smoothValue.y.get(),
			};
		}

		smoothValue.x.set(lerp(smoothValue.x.get(), x.get(), 0.1));
		smoothValue.y.set(lerp(smoothValue.y.get(), y.get(), 0.1));
	});

	const x = useTransform(
		smoothValue.x,
		[0, dimension.width],
		[(-1 * viewport.width) / 2, viewport.width / 2],
	);

	const y = useTransform(
		smoothValue.y,
		[0, dimension.height],
		[viewport.height / 2, (-1 * viewport.height) / 2],
	);

	useEffect(() => {
		if (activeProject !== null && meshRef.current) {
			// @ts-ignore
			meshRef.current.material.uniforms.u_texture.value =
				textures[activeProject.id - 1];
		}
	}, [activeProject, textures]);

	return (
		<motion.mesh ref={meshRef} position-x={x} position-y={y}>
			<planeGeometry args={[2, 3.4, 15, 15]} />
			<shaderMaterial
				uniforms={uniform.current}
				fragmentShader={fragment}
				vertexShader={vertex}
			/>
		</motion.mesh>
	);
};

export default Model;
