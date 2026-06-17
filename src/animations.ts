import { Easing, interpolate } from "remotion";
import React from "react";

export const getAnimatedStyle = (
	frame: number,
	fps: number,
	delaySec: number,
	variant: string
): React.CSSProperties => {
	const delayFrames = Math.round(delaySec * fps);
	const durationSec =
		variant === "enter-swipe"
			? 0.48
			: variant === "enter-zoom"
			? 0.42
			: variant === "enter-clip"
			? 0.50
			: 0.52;
	const durationFrames = Math.round(durationSec * fps);

	const startFrame = delayFrames;
	const endFrame = delayFrames + durationFrames;

	const easing = Easing.bezier(0.16, 1, 0.3, 1);

	// Opacity is standard for all entrances
	const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing,
	});

	let transform = "";
	let clipPath = "";
	let filter = "";

	if (variant === "enter-rise") {
		const translateY = interpolate(frame, [startFrame, endFrame], [38, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `translateY(${translateY}px)`;
	} else if (variant === "enter-swipe") {
		const translateX = interpolate(frame, [startFrame, endFrame], [-52, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `translateX(${translateX}px)`;
	} else if (variant === "enter-zoom") {
		const scale = interpolate(frame, [startFrame, endFrame], [0.92, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `scale(${scale})`;
	} else if (variant === "enter-clip") {
		const translateX = interpolate(frame, [startFrame, endFrame], [-18, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const clipWidth = interpolate(frame, [startFrame, endFrame], [100, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `translateX(${translateX}px)`;
		clipPath = `inset(0 ${clipWidth}% 0 0)`;
	} else if (variant === "enter-blur") {
		const translateY = interpolate(frame, [startFrame, endFrame], [18, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const blur = interpolate(frame, [startFrame, endFrame], [10, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `translateY(${translateY}px)`;
		filter = `blur(${blur}px)`;
	}

	return {
		opacity,
		transform,
		clipPath,
		filter,
		animation: "none", // Disable standard time-based CSS animations
	};
};

export const getPhoneAnimatedStyle = (
	frame: number,
	fps: number,
	delaySec: number,
	isCenter: boolean
): React.CSSProperties => {
	const delayFrames = Math.round(delaySec * fps);
	const durationFrames = Math.round(0.62 * fps);
	const startFrame = delayFrames;
	const endFrame = delayFrames + durationFrames;
	const easing = Easing.bezier(0.16, 1, 0.3, 1);

	const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing,
	});

	// Subtle float/hover effect that kicks in after entrance starts
	const floatProgress = interpolate(frame, [startFrame, startFrame + 45], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing,
	});
	const floatOffset = floatProgress * Math.sin((frame - startFrame) / 18) * 12;
	const floatRotate = floatProgress * Math.cos((frame - startFrame) / 26) * 0.6;

	if (isCenter) {
		const translateYPercent = interpolate(frame, [startFrame, endFrame], [10, -50], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const rotate = interpolate(frame, [startFrame, endFrame], [4, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const scale = interpolate(frame, [startFrame, endFrame], [0.88, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});

		return {
			opacity,
			transform: `translate(-50%, calc(${translateYPercent}% + ${floatOffset}px)) rotate(${rotate + floatRotate}deg) scale(${scale})`,
			animation: "none",
		};
	} else {
		const translateY = interpolate(frame, [startFrame, endFrame], [180, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const rotate = interpolate(frame, [startFrame, endFrame], [8, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const scale = interpolate(frame, [startFrame, endFrame], [0.85, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});

		return {
			opacity,
			transform: `translateY(${translateY + floatOffset}px) rotate(${rotate + floatRotate}deg) scale(${scale})`,
			animation: "none",
		};
	}
};
