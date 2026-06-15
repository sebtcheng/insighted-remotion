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
		variant: "enter-rise",
	},
	{
		start: 35.3,
		end: 68.0,
		kicker: "Phase 1: Setup & Gate Rule",
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
		kicker: "Phase 2: Construction Logs",
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
		variant: "enter-zoom",
	},
	{
		start: 103.1,
		end: 137.5,
		kicker: "Slide 03: Phase 1",
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
		variant: "enter-zoom",
	},
	{
		start: 137.5,
		end: 176.2,
		kicker: "Slide 04: Requirements",
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
		variant: "enter-blur",
	},
	{
		start: 176.2,
		end: 208.9,
		kicker: "Slide 05: Gateway",
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
		kicker: "Slide 06: Phase 2",
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
		variant: "enter-rise",
			},
	{
		start: 236.9,
		end: 271.9,
		kicker: "Slide 07: Matrix",
		title: "Objective Matrix Tally",
		keywords: ["Checklist", "Milestone Weights", "Live Estimator"],
		bullets: [
			{
				title: "Milestone Weights",
				description: "Prep (5%), Foundations (15%), Framing (20%), Roofing (15%), Masonry (25%), Finishing (20%).",
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
		variant: "enter-zoom",
	},
	{
		start: 271.9,
		end: 303.1,
		kicker: "Slide 08: Evidence",
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
		variant: "enter-blur",
	},
	{
		start: 303.1,
		end: 335.2,
		kicker: "Slide 09: Outcome",
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
];

const SceneLayer: React.FC<{scene: Scene}> = ({scene}) => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;
	const duration = (scene.end - scene.start) * fps;
	const opacity = interpolate(
		frame,
		[0, 15, duration - 15, duration],
		[0, 1, 1, 0],
		{extrapolateLeft: "clamp", extrapolateRight: "clamp"}
	);

	const isSettled = frame > 30;

	return (
		<AbsoluteFill className="scene" style={{opacity}}>
			<div className="grid" />
			<div className="glow glowOne" />
			<div className="glow glowTwo" />

			<div className="textStage">
				<div className="brandLine" style={{display: "flex", alignItems: "center"}}>
					<Img src={staticFile("InsightED_logo.png")} alt="InsightED Logo" style={{height: "220px", width: "auto", objectFit: "contain", filter: "drop-shadow(2px 0 0 #ffffff) drop-shadow(-2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(0 -2px 0 #ffffff)"}} />
				</div>

				<div className={`sceneBody ${scene.variant} ${isSettled ? "settled" : ""}`}>
					<div className="kicker">{scene.kicker}</div>
					<h1 className="title">{scene.title}</h1>
					<div className="keywordRow">
						{scene.keywords.map((keyword, index) => (
							<span className="keyword" key={index}>
								{keyword}
							</span>
						))}
					</div>
					<ul className="bulletList">
						{scene.bullets.map((bullet, index) => (
							<li className="bullet" key={index}>
								<div className="bulletText">
									<span className="bulletTitle">{bullet.title}</span>
									<span className="bulletDescription">{bullet.description}</span>
								</div>
							</li>
						))}
					</ul>
					{scene.caption && <div className="caption">{scene.caption}</div>}
				</div>
			</div>
		</AbsoluteFill>
	);
};

export const InsightEDInfrastructure: React.FC = () => {
	const fps = useVideoConfig().fps;

	return (
		<AbsoluteFill className="videoRoot">
			<Audio src={staticFile("audio_tracks/InsightED_Video_BGM.mp3")} volume={0.15} loop />
			{scenes.map((scene, index) => (
				<Sequence
					key={`${scene.start}-${scene.title}`}
					from={scene.start * fps}
					durationInFrames={Math.round((scene.end - scene.start) * fps)}
				>
					{index < 10 && (
						<Sequence from={Math.round(0.5 * fps)}>
							<Audio src={staticFile(`audio_tracks/infra/infra${index + 1}.mp3`)} volume={0.95} />
						</Sequence>
					)}
					<SceneLayer scene={scene} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
