import React from "react";
import {
	AbsoluteFill,
	Audio,
	Img,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import "./insighted-promo.css";
import { getAnimatedStyle, getPhoneAnimatedStyle } from "./animations";

type Bullet = {
	title: string;
	description: string;
};

type Scene = {
	start: number;
	end: number;
	kicker: string;
	title: string;
	keywords: string[];
	bullets: Bullet[];
	caption: string;
	variant: string;
	isOutro?: boolean;
};

const scenes: Scene[] = [
	{
		start: 0,
		end: 35.3,
		kicker: "InsightED Mobile App",
		title: "Infrastructure Progress Monitoring Guide",
		keywords: ["Mobile Workflow", "Register Projects", "Verifiable Updates"],
		bullets: [
			{
				title: "Digital Record",
				description: "One project equals one complete digital record integrating procurement, construction, and physical evidence.",
			},
			{
				title: "Gate Rule",
				description: "Enforces logic-based unlocking: construction monitoring begins only after validated procurement.",
			},
			{
				title: "Evidence-Based",
				description: "Progress updates supported by geo-tagged photos and checklist validation.",
			},
		],
		caption: "",
		variant: "enter-fade",
	},
	{
		start: 35.3,
		end: 68.0,
		kicker: "",
		title: "Setup & Gate Rule",
		keywords: ["PWA", "DepEd Email", "GPS & Camera", "Gate Rule"],
		bullets: [
			{
				title: "Mobile Setup",
				description: "Install the PWA to your home screen; log in with official DepEd emails and grant GPS/camera permissions.",
			},
			{
				title: "Procurement Data",
				description: "Encode Project ID, implementing unit, contractor info, and contract/milestone dates.",
			},
			{
				title: "Verification Gateway",
				description: "Enforces date order (NOA -> NTP -> Start) to unlock the construction tab.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 68.0,
		end: 103.1,
		kicker: "",
		title: "Progress & Outcomes",
		keywords: ["Project Cards", "Objective Matrix", "Geotagged Proof"],
		bullets: [
			{
				title: "Construction Update",
				description: "Select project status (Ongoing, Suspended, For Inspection) and submit progress logs.",
			},
			{
				title: "Objective Matrix",
				description: "Tally completed milestones (foundations, roofing) to calculate actual completion percentage.",
			},
			{
				title: "Geotagged Evidence",
				description: "Upload multi-angle photos with automatically validated coordinates.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 103.1,
		end: 137.5,
		kicker: "",
		title: "Phase 1: Setup & Access",
		keywords: ["PWA Setup", "DepEd Email", "Camera & GPS"],
		bullets: [
			{
				title: "PWA Setup",
				description: "Install the app directly to your home screen for lightweight field reporting.",
			},
			{
				title: "Account Registration",
				description: "Restricted to official DepEd emails (Division Engineers) for traceability.",
			},
			{
				title: "Camera & GPS",
				description: "Grant device permissions to capture live geotagged physical evidence.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 137.5,
		end: 176.2,
		kicker: "",
		title: "Procurement Requirements",
		keywords: ["ID & Timeline", "Execution Steps", "Entity & Cost"],
		bullets: [
			{
				title: "ID & Timeline",
				description: "Encode Project ID, PCAB license, and contract/milestone dates.",
			},
			{
				title: "Execution Steps",
				description: "Record invitation to bid, pre-bid conference, and post-qualification logs.",
			},
			{
				title: "Entity & Cost",
				description: "Verify contractor name, awarded contract amount, and funding sources.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 176.2,
		end: 208.9,
		kicker: "",
		title: "Setup & Gate Rule",
		keywords: ["Gate Rule", "Chronological Checks", "Duplicate Checks"],
		bullets: [
			{
				title: "Logical Gate",
				description: "Construction monitoring tab is locked until procurement details are verified.",
			},
			{
				title: "Date Consistency",
				description: "System verifies the date sequence (NOA -> NTP -> Planned Start).",
			},
			{
				title: "Prevention",
				description: "Blocks duplicate project registrations and ensures financial integrity.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 208.9,
		end: 236.9,
		kicker: "",
		title: "Phase 2: Construction Logs",
		keywords: ["Project Cards", "Update Percentage", "Status & Remarks"],
		bullets: [
			{
				title: "Find Project",
				description: "Search by school, code, or name to access active monitoring cards.",
			},
			{
				title: "Update Status",
				description: "Mark project state: Ongoing, Suspended, or For Inspection with remarks.",
			},
			{
				title: "Calculations",
				description: "Tally milestones; app calculates completion percentage dynamically.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 236.9,
		end: 279.8,
		kicker: "",
		title: "Objective Matrix Tally",
		keywords: ["Checklist", "Milestone Weights", "Live Estimator"],
		bullets: [
			{
				title: "Milestone Weights",
				description: "Weights are distributed across key project phases from initial preparation to final finishing.",
			},
			{
				title: "Objective Calculations",
				description: "Progress is computed strictly from completed work items, avoiding guesswork.",
			},
			{
				title: "Validation Rules",
				description: "Every checked milestone item triggers a specific validation check requirement.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 279.8,
		end: 311.0,
		kicker: "",
		title: "Photo Evidence Specs",
		keywords: ["Geotagged Metadata", "Angle Coverage", "Validation Match"],
		bullets: [
			{
				title: "Geotag Validation",
				description: "System reads image metadata to verify coordinates and timestamps match the site.",
			},
			{
				title: "Angle Coverage",
				description: "Upload internal and external construction photos from 2-3 distinct angles.",
			},
			{
				title: "Validation Match",
				description: "Ensures physical proof matches the reported accomplishment matrix.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 311.0,
		end: 343.1,
		kicker: "",
		title: "Impact & Accountability",
		keywords: ["Data Integrity", "Operational Speed", "Traceable Audit Trail"],
		bullets: [
			{
				title: "Data Integrity",
				description: "Enforces complete audit history and prevents reporting gaps.",
			},
			{
				title: "Operational Speed",
				description: "Accelerates division consolidation and eliminates manual updates.",
			},
			{
				title: "Accountability",
				description: "Provides clear proof of who updated what, when, and where.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 343.1,
		end: 348.1,
		kicker: "",
		title: "",
		keywords: [],
		bullets: [],
		caption: "",
		variant: "enter-swipe",
		isOutro: true,
	},
];

const SceneLayer: React.FC<{scene: Scene; index: number}> = ({scene, index}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const isSettled = frame > 30;
	const isIntroSlide = index === 0;
	const isOutro = scene.isOutro;

	const fadeOutStartFrame = (scene.end - scene.start) * fps - 45;
	const fadeOutProgress = interpolate(frame, [fadeOutStartFrame, (scene.end - scene.start) * fps], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const logoFilter = isOutro 
		? "drop-shadow(2px 0 0 #ffffff) drop-shadow(-2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(0 -2px 0 #ffffff) drop-shadow(0 0 12px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(125, 211, 252, 0.25))"
		: "drop-shadow(2px 0 0 #ffffff) drop-shadow(-2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(0 -2px 0 #ffffff)";


	// Slide transition logic matching HTML:
	const fadeFrames = 15;
	let opacity = 1;
	let clipPath = "inset(0 0 0 0)";

	if (index > 0 && !isOutro) {
		if (frame < fadeFrames) {
			const progressVal = frame / fadeFrames;
			const easedProgress = 1 - Math.pow(1 - progressVal, 3);
			opacity = progressVal;
			const clipPercent = 100 - (easedProgress * 100);
			clipPath = `inset(0 ${clipPercent}% 0 0)`;
		}
	} else if (isOutro) {
		opacity = interpolate(frame, [0, fadeFrames], [0, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
	}

	const outroFadeOpacity = isOutro ? 1 - fadeOutProgress : 1;
	const combinedOpacity = opacity * outroFadeOpacity;
	const absoluteFrame = Math.round(scene.start * fps) + frame;

	return (
		<AbsoluteFill style={{ opacity: combinedOpacity, clipPath, isolation: "isolate", zIndex: 2 }}>
			{index === 0 && frame < 15 && (
				<AbsoluteFill
					style={{
						backgroundColor: "white",
						zIndex: 100,
						opacity: interpolate(frame, [0, 15], [1, 0], {
							extrapolateLeft: "clamp",
							extrapolateRight: "clamp",
						}),
					}}
				/>
			)}

			<div className="textStage">
				<div className="brandLine" style={isOutro ? {
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					justifyContent: "center",
					width: "auto",
					margin: "0"
				} : {display: "flex", alignItems: "center"}}>
					<Img 
						src={staticFile("InsightED_logo.png")} 
						alt="InsightED Logo" 
						className={isOutro ? "logo-glowing" : ""}
						style={{
							height: isOutro ? "700px" : isIntroSlide ? "220px" : "130px", 
							width: "auto", 
							objectFit: "contain", 
							filter: logoFilter
						}} 
					/>
				</div>

				{!isOutro && (
					<div className={`sceneBody ${scene.variant} ${isSettled ? "settled" : ""}`}>
						{scene.kicker && (
							<div className="kicker" style={getAnimatedStyle(frame, fps, 0, scene.variant)}>
								{scene.kicker}
							</div>
						)}
						<h1 className="title" style={getAnimatedStyle(frame, fps, 0, scene.variant)}>
							{scene.title}
						</h1>
						<div className="keywordRow">
							{scene.keywords.map((keyword, kIdx) => (
								<span
									className="keyword"
									key={kIdx}
									style={getAnimatedStyle(frame, fps, 0.08 + kIdx * 0.06, scene.variant)}
								>
									{keyword}
								</span>
							))}
						</div>
						<ul className="bulletList">
							{scene.bullets.map((bullet, bIdx) => (
								<li
									className="bullet"
									key={bIdx}
									style={getAnimatedStyle(frame, fps, 0.08 + bIdx * 0.06, scene.variant)}
								>
									<div className="bulletText">
										<span className="bulletTitle">{bullet.title}</span>
										<span className="bulletDescription">{bullet.description}</span>
									</div>
								</li>
							))}
						</ul>
						{scene.caption && (
							<div className="caption" style={getAnimatedStyle(frame, fps, 0.32, scene.variant)}>
								{scene.caption}
							</div>
						)}
					</div>
				)}
			</div>

			{index === 3 && !isOutro && (
				<div className="visuals-container">
					<div className="phone-mockup phone-1" style={getPhoneAnimatedStyle(frame, fps, 0.12, false, absoluteFrame)}>
						<Img src={staticFile("image/infra4.png")} alt="Setup Screen 1" />
					</div>
					<div className="phone-mockup phone-2" style={getPhoneAnimatedStyle(frame, fps, 0.28, false, absoluteFrame)}>
						<Img src={staticFile("image/infra4.1.png")} alt="Setup Screen 2" />
					</div>
				</div>
			)}
			{index === 4 && !isOutro && (
				<div className="visuals-container">
					<div className="phone-mockup phone-1" style={getPhoneAnimatedStyle(frame, fps, 0.12, false, absoluteFrame)}>
						<Img src={staticFile("image/infra5.png")} alt="Procurement Screen 1" />
					</div>
					<div className="phone-mockup phone-2" style={getPhoneAnimatedStyle(frame, fps, 0.28, false, absoluteFrame)}>
						<Img src={staticFile("image/infra5.1.png")} alt="Procurement Screen 2" />
					</div>
				</div>
			)}
			{index === 5 && !isOutro && (
				<div className="visuals-container landscape-layout">
					<div className="phone-mockup phone-1 browser-mockup" style={getPhoneAnimatedStyle(frame, fps, 0.12, false, absoluteFrame)}>
						<div className="browser-header">
							<span className="dot red"></span>
							<span className="dot yellow"></span>
							<span className="dot green"></span>
						</div>
						<Img src={staticFile("image/infra6.png")} alt="Gateway Screen 1" />
					</div>
					<div className="phone-mockup phone-2 browser-mockup" style={getPhoneAnimatedStyle(frame, fps, 0.28, false, absoluteFrame)}>
						<div className="browser-header">
							<span className="dot red"></span>
							<span className="dot yellow"></span>
							<span className="dot green"></span>
						</div>
						<Img src={staticFile("image/infra6.1.png")} alt="Gateway Screen 2" />
					</div>
				</div>
			)}
			{index === 6 && !isOutro && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/infra7.png")} alt="Construction Logs Screen" />
					</div>
				</div>
			)}
			{index === 7 && !isOutro && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/infra8.png")} alt="Objective Matrix Screen" />
					</div>
				</div>
			)}
			{index === 8 && !isOutro && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/infra9.png")} alt="Photo Evidence Screen" />
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};

export const InsightEDInfrastructure: React.FC = () => {
	const { fps, durationInFrames } = useVideoConfig();

	const bgmVolume = interpolate(
		useCurrentFrame(),
		[durationInFrames - 45, durationInFrames],
		[0.3, 0],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		}
	);

	return (
		<AbsoluteFill className="videoRoot scene">
			<div className="grid" />
			<div className="glow glowOne" />
			<div className="glow glowTwo" />
			<Audio src={staticFile("audio_tracks/InsightED_Video_BGM.mp3")} volume={bgmVolume} loop />
			{scenes.map((scene, index) => (
				<Sequence
					key={`${scene.start}-${scene.title}`}
					from={scene.start * fps}
					durationInFrames={Math.round((scene.end - scene.start) * fps)}
				>
					{index >= 0 && index <= 9 && (
						<Sequence from={Math.round(0.5 * fps)}>
							<Audio src={staticFile(`audio_tracks/infra/infra${index + 1}.mp3`)} volume={0.95} />
						</Sequence>
					)}
					<SceneLayer scene={scene} index={index} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
