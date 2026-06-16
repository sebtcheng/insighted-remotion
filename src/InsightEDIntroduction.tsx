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
};

const scenes: Scene[] = [
	{
		start: 0,
		end: 10.01,
		kicker: "Welcome to",
		title: "InsightED",
		keywords: ["Centralized", "Mobile-first", "Validated data"],
		bullets: [
			{
				title: "Collect",
				description: "Gather education data from schools, facilities, personnel, finance, and resources.",
			},
			{
				title: "Validate",
				description: "Check records closer to the source before they move across governance levels.",
			},
			{
				title: "Monitor",
				description: "Track updates, submissions, and operational signals in a shared workflow.",
			},
			{
				title: "Analyze",
				description: "Turn field data into timely insights for planning and decision-making.",
			},
		],
		caption: "",
		variant: "enter-rise",
	},
	{
		start: 10.01,
		end: 24.62,
		kicker: "One connected flow",
		title: "Role-specific portals",
		keywords: ["One data flow", "Shared picture", "Reliable records"],
		bullets: [
			{
				title: "School portal",
				description: "Manage local institution records and student allocations.",
			},
			{
				title: "Engineer portal",
				description: "Track regional infrastructure and physical asset requests.",
			},
			{
				title: "Division review",
				description: "Evaluate performance metrics across districts.",
			},
			{
				title: "National dashboards",
				description: "Access high-level summaries for administrative planning.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 24.62,
		end: 37.74,
		kicker: "For schools",
		title: "Real-time school updates",
		keywords: ["School profiles", "Learner counts", "Facilities"],
		bullets: [
			{
				title: "Guided modules",
				description: "Help school heads submit consistent records through structured field workflows.",
			},
			{
				title: "Resource inventory",
				description: "Update learning resources, equipment, and facility-related school assets.",
			},
			{
				title: "Infrastructure status",
				description: "Document classrooms, facilities, and physical conditions as they change.",
			},
			{
				title: "Field-ready updates",
				description: "Support practical reporting in schools with limited time and connectivity.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 37.74,
		end: 47.46,
		kicker: "Offline-first",
		title: "Prepare now. Sync later.",
		keywords: ["Offline-first", "Local records", "Auto-sync"],
		bullets: [
			{
				title: "Work with limited internet",
				description: "Continue preparing records even when field connectivity is unstable.",
			},
			{
				title: "Save records offline",
				description: "Keep entries locally until a connection is available for upload.",
			},
			{
				title: "Sync when connected",
				description: "Automatically move prepared records into the shared data flow.",
			},
		],
		caption: "",
		variant: "enter-zoom",
	},
	{
		start: 47.46,
		end: 57.79,
		kicker: "For engineers",
		title: "Structured project monitoring",
		keywords: ["Inspections", "Geotagged evidence", "Progress reports"],
		bullets: [
			{
				title: "Project records",
				description: "Organize implementation details, timelines, and monitoring information in one place.",
			},
			{
				title: "Damage assessments",
				description: "Capture reported issues and severity levels for structured review.",
			},
			{
				title: "Inspection updates",
				description: "Record site observations and progress notes from implementing teams.",
			},
			{
				title: "Photo evidence",
				description: "Attach visual proof that strengthens validation and accountability.",
			},
		],
		caption: "",
		variant: "enter-blur",
	},
	{
		start: 57.79,
		end: 67.51,
		kicker: "From field to review",
		title: "Ground reality becomes planning evidence",
		keywords: ["Ground reality", "Verified record", "Planning input"],
		bullets: [
			{
				title: "Capture",
				description: "Document field realities as they are observed by teams on the ground.",
			},
			{
				title: "Structure",
				description: "Transform raw observations into standardized records for review.",
			},
			{
				title: "Review",
				description: "Make evidence easier to check, compare, and validate across levels.",
			},
			{
				title: "Plan",
				description: "Use verified information to guide priorities, budgets, and responses.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 67.51,
		end: 78.38,
		kicker: "For divisions and regions",
		title: "Less manual consolidation",
		keywords: ["Review", "Filter", "Validate", "Monitor"],
		bullets: [
			{
				title: "Fewer files",
				description: "Reduce repeated consolidation across disconnected spreadsheets and reports.",
			},
			{
				title: "Live dashboards",
				description: "View updated submissions and status signals without manual recompilation.",
			},
			{
				title: "Validation queues",
				description: "Prioritize records that need checking, correction, or approval.",
			},
			{
				title: "Submission tracking",
				description: "Monitor who submitted, what changed, and what still needs action.",
			},
		],
		caption: "",
		variant: "enter-rise",
	},
	{
		start: 78.38,
		end: 91.27,
		kicker: "For central office",
		title: "Verified records for national insight",
		keywords: ["National summaries", "Class-size analysis", "Budget visibility"],
		bullets: [
			{
				title: "Facilities monitoring",
				description: "Track infrastructure and resource conditions across schools and regions.",
			},
			{
				title: "Personnel registries",
				description: "Support workforce visibility through organized personnel-related records.",
			},
			{
				title: "Policy-ready summaries",
				description: "Prepare validated information for executive review and policy planning.",
			},
			{
				title: "Resource dashboards",
				description: "Connect national views to the records used for resource decisions.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 91.27,
		end: 100.05,
		kicker: "More than forms",
		title: "Usable data sooner",
		keywords: ["Clearer context", "Stronger accountability", "Faster decisions"],
		bullets: [
			{
				title: "Not just digitized forms",
				description: "Move beyond online entry toward information that can guide action.",
			},
			{
				title: "Actionable records",
				description: "Connect each submission to context, status, and decision relevance.",
			},
			{
				title: "Earlier visibility",
				description: "Surface validated information sooner for timely analysis and response.",
			},
		],
		caption: "",
		variant: "enter-zoom",
	},
	{
		start: 100.05,
		end: 112.33,
		kicker: "Better governance",
		title: "From delayed reporting to proactive response",
		keywords: ["Reviewed", "Trusted", "Acted on"],
		bullets: [
			{
				title: "Collect consistently",
				description: "Use guided structures so records are easier to compare and trust.",
			},
			{
				title: "Validate near source",
				description: "Improve reliability by checking data closer to where it is created.",
			},
			{
				title: "Share across levels",
				description: "Make information visible to schools, divisions, regions, and national teams.",
			},
			{
				title: "Respond sooner",
				description: "Support faster planning adjustments and more proactive governance action.",
			},
		],
		caption: "",
		variant: "enter-blur",
	},
	{
		start: 112.33,
		end: 120.98,
		kicker: "Shared foundation",
		title: "One foundation for governance",
		keywords: ["Schools", "Divisions", "Regions", "National offices"],
		bullets: [
			{
				title: "Planning",
				description: "Use one information base to align priorities and resource allocation.",
			},
			{
				title: "Monitoring",
				description: "Track progress, validation, and needs across governance levels.",
			},
			{
				title: "Decision-making",
				description: "Give leaders timely context for coordinated and responsive action.",
			},
		],
		caption: "",
		variant: "enter-swipe",
	},
	{
		start: 120.98,
		end: 133.03,
		kicker: "InsightED",
		title: "Timely. Validated. Shared.",
		keywords: ["Governance tool", "Better prepared", "More responsive"],
		bullets: [
			{
				title: "Timely information",
				description: "Bring critical data into view earlier for planning and response.",
			},
			{
				title: "Validated records",
				description: "Strengthen trust by making verification part of the operating flow.",
			},
			{
				title: "Shared visibility",
				description: "Connect stakeholders around the same information and priorities.",
			},
			{
				title: "Coordinated planning",
				description: "Support decisions that are better prepared and more responsive to schools.",
			},
		],
		caption: "",
		variant: "enter-rise",
	},
];

const SceneLayer: React.FC<{scene: Scene; index: number}> = ({scene, index}) => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;

	const isSettled = frame > 30;

	return (
		<AbsoluteFill className="scene">
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
			<div className="grid" />
			<div className="glow glowOne" />
			<div className="glow glowTwo" />

			<div className="textStage">
				<div className="brandLine" style={{display: "flex", alignItems: "center"}}>
					<Img src={staticFile("InsightED_logo.png")} alt="InsightED Logo" style={{height: "220px", width: "auto", objectFit: "contain", filter: "drop-shadow(2px 0 0 #ffffff) drop-shadow(-2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(0 -2px 0 #ffffff)"}} />
				</div>

				<div className={`sceneBody ${scene.variant} ${isSettled ? "settled" : ""}`}>
					<div className="kicker" style={getAnimatedStyle(frame, fps, 0, scene.variant)}>
						{scene.kicker}
					</div>
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
			</div>

			{index === 0 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true)}>
						<Img src={staticFile("image/intro1.png")} alt="Welcome to InsightED" />
					</div>
				</div>
			)}
			{index === 1 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-1" style={getPhoneAnimatedStyle(frame, fps, 0.12, false)}>
						<Img src={staticFile("image/intro2.png")} alt="Role-specific portals 1" />
					</div>
					<div className="phone-mockup phone-2" style={getPhoneAnimatedStyle(frame, fps, 0.28, false)}>
						<Img src={staticFile("image/intro2.1.png")} alt="Role-specific portals 2" />
					</div>
				</div>
			)}
			{index === 2 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true)}>
						<Img src={staticFile("image/intro3.png")} alt="Real-time school updates" />
					</div>
				</div>
			)}
			{index === 4 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true)}>
						<Img src={staticFile("image/intro5.png")} alt="Structured project monitoring" />
					</div>
				</div>
			)}
			{index === 6 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true)}>
						<Img src={staticFile("image/intro7.png")} alt="Less manual consolidation" />
					</div>
				</div>
			)}
			{index === 7 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true)}>
						<Img src={staticFile("image/intro8.png")} alt="Verified records for national insight" />
					</div>
				</div>
			)}
			{index >= 8 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true)}>
						<Img src={staticFile("image/intro1.png")} alt="InsightED Summary" />
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};

export const InsightEDIntroduction: React.FC = () => {
	const fps = useVideoConfig().fps;

	return (
		<AbsoluteFill className="videoRoot">
			<Audio src={staticFile("audio_tracks/InsightED_Video_BGM.mp3")} volume={0.3} loop />
			{scenes.map((scene, index) => (
				<Sequence
					key={`${scene.start}-${scene.title}`}
					from={scene.start * fps}
					durationInFrames={Math.round((scene.end - scene.start) * fps)}
				>
					<Audio src={staticFile(`audio_tracks/InsightED_PrimerVid_SL${index + 1}.mp3`)} volume={0.95} />
					<SceneLayer scene={scene} index={index} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};