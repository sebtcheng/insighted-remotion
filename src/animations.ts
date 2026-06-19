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
		const translateY = interpolate(frame, [startFrame, endFrame], [19, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `translateY(${translateY}px)`;
	} else if (variant === "enter-swipe") {
		const translateX = interpolate(frame, [startFrame, endFrame], [-26, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `translateX(${translateX}px)`;
	} else if (variant === "enter-zoom") {
		const scale = interpolate(frame, [startFrame, endFrame], [0.96, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		transform = `scale(${scale})`;
	} else if (variant === "enter-clip") {
		const translateX = interpolate(frame, [startFrame, endFrame], [-9, 0], {
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
		const translateY = interpolate(frame, [startFrame, endFrame], [9, 0], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const blur = interpolate(frame, [startFrame, endFrame], [5, 0], {
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
	isCenter: boolean,
	absoluteFrame?: number
): React.CSSProperties => {
	const delayFrames = Math.round(delaySec * fps);
	const durationFrames = Math.round(0.9 * fps); // Smoother/slower duration (0.9s instead of 0.62s)
	const startFrame = delayFrames;
	const endFrame = delayFrames + durationFrames;
	const easing = Easing.bezier(0.25, 1, 0.5, 1); // Gentler, smoother easing

	const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing,
	});

	// Looping animation (float/hover) reduced by 50%
	const floatProgress = interpolate(frame, [startFrame, startFrame + 45], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing,
	});
	
	const floatFrame = absoluteFrame !== undefined ? absoluteFrame : frame;
	const floatPeriod = isCenter ? 18.14 : 26.26; // Match CSS periods (3.8s and 5.5s)
	const floatOffset = floatProgress * Math.sin(floatFrame / floatPeriod) * (isCenter ? 6 : 3);
	const floatRotate = 0;

	// Looping breath scale reduced by 50% (0.005 instead of 0.01)
	const breathScale = isCenter ? (1 + floatProgress * Math.max(0, -Math.sin(floatFrame / floatPeriod)) * 0.005) : 1;

	if (isCenter) {
		const translateYPercent = interpolate(frame, [startFrame, endFrame], [-42.5, -50], { // Smaller entrance movement (starts from -42.5% instead of -20%)
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const rotate = interpolate(frame, [startFrame, endFrame], [0.5, 0], { // Less rotation (0.5deg instead of 2deg)
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const scale = interpolate(frame, [startFrame, endFrame], [0.975, 1], { // Smaller scale shift (starts from 0.975 instead of 0.94)
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});

		return {
			opacity,
			transform: `translate(-50%, calc(${translateYPercent}% + ${floatOffset}px)) rotate(${rotate + floatRotate}deg) scale(${scale * breathScale})`,
			animation: "none",
		};
	} else {
		const translateY = interpolate(frame, [startFrame, endFrame], [30, 0], { // Smaller entrance offset (starts from 30px instead of 90px)
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const rotate = interpolate(frame, [startFrame, endFrame], [1, 0], { // Less rotation (1deg instead of 4deg)
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});
		const scale = interpolate(frame, [startFrame, endFrame], [0.97, 1], { // Smaller scale shift (starts from 0.97 instead of 0.925)
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing,
		});

		return {
			opacity,
			transform: `translateY(${translateY + floatOffset}px) rotate(${rotate + floatRotate}deg) scale(${scale * breathScale})`,
			animation: "none",
		};
	}
};
