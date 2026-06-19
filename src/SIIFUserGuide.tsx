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
	// Part 1: School Head Guide
	{
		start: 0,
		end: 23,
		kicker: "InsightED Mobile App",
		title: "SIIF School Head Guide",
		keywords: ["Complete Guide", "Answer the Site", "Built-in Safeguards"],
		bullets: [
			{
				title: "Learn the Steps",
				description: "Discover how to log in, navigate the portal, fill out required fields, and track spending.",
			},
			{
				title: "Follow Lock Rules",
				description: "Understand the strict sequential inputs and deadlines to avoid form lockout.",
			},
			{
				title: "Manage Budget",
				description: "Distribute estimates correctly within your school's designated allocation limit.",
			},
		],
		caption: "",
		variant: "enter-rise",
	},
	{
		start: 23,
		end: 44,
		kicker: "Access Portal",
		title: "Login & Locate the Portal",
		keywords: ["DepEd Email Credentials", "Nexus Portal Path", "Other Services"],
		bullets: [
			{
				title: "No Registration",
				description: "Credentials are synced automatically from the main InsightED platform.",
			},
			{
				title: "Nexus Dashboard",
				description: "Navigate to the InsightED Nexus Portal using your web browser.",
			},
			{
				title: "Click SIIF Portal",
				description: "Locate 'Other Services' and click the SIIF Portal icon to view your allocation balance.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 44,
		end: 67,
		kicker: "Planning Hub",
		title: "Initialize & Unlock Forms",
		keywords: ["Modify Hub Drafts", "Deadline Countdown", "Sequential Locking"],
		bullets: [
			{
				title: "Modify Hub Mode",
				description: "Click 'Modify Hub' or navigate to the Forms tab to create or revise drafts.",
			},
			{
				title: "Observe Deadlines",
				description: "Ensure all steps are saved before the active calendar period closes and locks fields.",
			},
			{
				title: "Step-by-Step Order",
				description: "Complete and confirm each step in order (1-4) to unlock subsequent modules.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 67,
		end: 97,
		kicker: "Steps 1–3",
		title: "Define Scope & Beneficiaries",
		keywords: ["Step 1: Interventions", "Step 2: Learner Counts", "Step 3: Activities"],
		bullets: [
			{
				title: "Step 1: Check Cards",
				description: "Select target intervention programs (e.g., Reading, Numeracy) and click Confirm.",
			},
			{
				title: "Step 2: Learners",
				description: "Input learner counts grouped by Key Stage. Type CONFIRM to save and progress.",
			},
			{
				title: "Step 3: Activities",
				description: "Tick policy-aligned activities, or select 'Others' to type custom actions.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 97,
		end: 118,
		kicker: "Step 4 Cost",
		title: "Budget Estimation Guards",
		keywords: ["Estimate Cost Row", "Allocation Target", "Freeze Warnings"],
		bullets: [
			{
				title: "Input Costs",
				description: "Write budget estimates for each program. The tracker sums them automatically.",
			},
			{
				title: "Budget Warnings",
				description: "If total exceeds the allocation limit, the submit action freezes and displays an Over Limit alert.",
			},
			{
				title: "Balance Values",
				description: "Adjust costs downward until the total fits within limits to successfully save.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 118,
		end: 139,
		kicker: "Proposal",
		title: "Review Summary & Submit",
		keywords: ["View Summary Button", "Full Audit Check", "Final Lock Status"],
		bullets: [
			{
				title: "View Summary",
				description: "Tap 'View Summary' at the bottom of the page to load the audit preview.",
			},
			{
				title: "Audit Review",
				description: "Double-check targeted learners count, mapped activities, and budget items.",
			},
			{
				title: "Final Submit",
				description: "Click Submit to lock proposal permanently for Division Office review.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 139,
		end: 158,
		kicker: "Utilization",
		title: "Log Quarterly Expenditures",
		keywords: ["Reporting Months", "Budget Caps", "Spent Balance Logs"],
		bullets: [
			{
				title: "Reporting Windows",
				description: "Fields are open for updates only during designated active months (July, October, January).",
			},
			{
				title: "Overspend Block",
				description: "You cannot input actual spent values that exceed the planned budget limit.",
			},
			{
				title: "Cumulative Lock",
				description: "Inputs lock automatically once the approved intervention allocation is fully depleted.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	// Part 2: RO/SDO Monitoring Guide
	{
		start: 158,
		end: 177,
		kicker: "InsightED Mobile App",
		title: "SIIF RO/SDO Monitoring",
		keywords: ["Complete Guide", "Jurisdiction Track", "Rosters & Compliance"],
		bullets: [
			{
				title: "Track School Allocation",
				description: "Review school-level budget allocations and compliance statuses across divisions.",
			},
			{
				title: "Check Interventions",
				description: "Audit planned activities and student recipient metrics dynamically.",
			},
			{
				title: "Verify Deadlines",
				description: "Follow up with non-compliant schools before active calendar gates close.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 177,
		end: 200,
		kicker: "System Access",
		title: "Portal Access & Codes",
		keywords: ["Create Account", "Fill Required Fields", "Authorization Codes"],
		bullets: [
			{
				title: "Access Portal",
				description: "Go to InsightED login and click 'Create New Account'.",
			},
			{
				title: "Establish Credentials",
				description: "Fill out the required name and email fields and set a password.",
			},
			{
				title: "Role Codes",
				description: "Input your designated Regional Office or Division Office authorization code.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 200,
		end: 219,
		kicker: "Nexus Home",
		title: "The Home Tab Overview",
		keywords: ["Recipients Tally", "Submitted Plan Count", "Budget Appropriations"],
		bullets: [
			{
				title: "Total Recipients",
				description: "Displays count of authorized eligible schools in your jurisdiction.",
			},
			{
				title: "Compliance Rate",
				description: "Indicates number and percentage of schools that finalized proposals.",
			},
			{
				title: "Appropriation Bar",
				description: "Shows total budget appropriated vs total regional/division budget limit.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 219,
		end: 237,
		kicker: "Divisions",
		title: "Regional Office Filtering",
		keywords: ["Granular Monitoring", "Division Search", "Dynamic Drill Down"],
		bullets: [
			{
				title: "Search SDO",
				description: "Use the top search bar to find a specific Schools Division Office.",
			},
			{
				title: "Roster Cards",
				description: "Roster lists divisions and progress status markers under your regional scope.",
			},
			{
				title: "Drill-down Action",
				description: "Click any division card to instantly filter the portal view to their schools.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 237,
		end: 271,
		kicker: "Schools Roster",
		title: "Schools Tab & Filter Roster",
		keywords: ["Roster View Modes", "Status Quick Filters", "Funnel Parameter Tools"],
		bullets: [
			{
				title: "Roster Views",
				description: "Toggle between Table layout (desktop review) and Cards layout (mobile screen).",
			},
			{
				title: "Status Selectors",
				description: "Filter schools quickly by Submitted, Pending, or Overdue plans.",
			},
			{
				title: "Funnel Filtering",
				description: "Filter list by budget size, beneficiary numbers, or planned program types.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 271,
		end: 293,
		kicker: "School Detail",
		title: "Plan Evaluation & Export",
		keywords: ["Progress Bar", "Interventions Navigation", "Download PDF Report"],
		bullets: [
			{
				title: "Evaluate Plans",
				description: "Open details modal to check school's mapped activities and targets.",
			},
			{
				title: "Internal Tabs",
				description: "Toggle details and grade beneficiary charts per intervention.",
			},
			{
				title: "Download PDF",
				description: "Click the Export icon at the top right to save PDF/HTML summaries.",
			},
		],
		caption: "",
		variant: "enter-clip",
	},
	{
		start: 293,
		end: 298,
		kicker: "",
		title: "",
		keywords: [],
		bullets: [],
		caption: "",
		variant: "enter-zoom",
		isOutro: true,
	},
];

const SceneLayer: React.FC<{scene: Scene; index: number}> = ({scene, index}) => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;

	const isSettled = frame > 30;
	// Intro slides (index 0 and 7) get big logo; all others get reduced
	const isIntroSlide = index === 0 || index === 7;
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
						<div className="kicker" style={getAnimatedStyle(frame, fps, 0, scene.variant)}>
							{scene.kicker.replace(/^Slide \d+:\s*/i, "")}
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
				)}
			</div>

			{/* Slide 01 → siif2.png (index 1) */}
			{index === 1 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/siif2.png")} alt="SIIF Slide 01" />
					</div>
				</div>
			)}

			{/* Slide 02 → siif3.png (index 2) */}
			{index === 2 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/siif3.png")} alt="SIIF Slide 02" />
					</div>
				</div>
			)}

			{/* Slide 03 → siif4.png + siif4.1.png + siif4.2.png (index 3) - cascade layout */}
			{index === 3 && (() => {
				const p1Base = getPhoneAnimatedStyle(frame, fps, 0.08, false, absoluteFrame);
				const p2Base = getPhoneAnimatedStyle(frame, fps, 0.22, false, absoluteFrame);
				const p3Base = getPhoneAnimatedStyle(frame, fps, 0.36, false, absoluteFrame);
				return (
					<div className="visuals-container triple-phones">
						<div className="phone-mockup phone-1" style={{...p1Base, transform: `${p1Base.transform} rotate(0deg)`}}>
							<Img src={staticFile("image/siif4.png")} alt="SIIF Slide 03a" />
						</div>
						<div className="phone-mockup phone-2" style={{...p2Base, transform: `${p2Base.transform} rotate(0deg)`}}>
							<Img src={staticFile("image/siif4.1.png")} alt="SIIF Slide 03b" />
						</div>
						<div className="phone-mockup phone-3" style={{...p3Base, transform: `${p3Base.transform} rotate(0deg)`}}>
							<Img src={staticFile("image/siif4.2.png")} alt="SIIF Slide 03c" />
						</div>
					</div>
				);
			})()}

			{/* Slide 04 → siif5.png (index 4) */}
			{index === 4 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/siif5.png")} alt="SIIF Slide 04" />
					</div>
				</div>
			)}

			{/* Slide 05 → siif6.png (index 5) */}
			{index === 5 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/siif6.png")} alt="SIIF Slide 05" />
					</div>
				</div>
			)}

			{/* Slide 07 → siif9.png + siif9.1.png (index 8) */}
			{index === 8 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-1" style={getPhoneAnimatedStyle(frame, fps, 0.08, false, absoluteFrame)}>
						<Img src={staticFile("image/siif9.png")} alt="SIIF Slide 07a" />
					</div>
					<div className="phone-mockup phone-2" style={getPhoneAnimatedStyle(frame, fps, 0.22, false, absoluteFrame)}>
						<Img src={staticFile("image/siif9.1.png")} alt="SIIF Slide 07b" />
					</div>
				</div>
			)}

			{/* Slide 08 → siif10.png (index 9) */}
			{index === 9 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/siif10.png")} alt="SIIF Slide 08" />
					</div>
				</div>
			)}

			{/* Slide 09 → siif11.png (index 10) */}
			{index === 10 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-center" style={getPhoneAnimatedStyle(frame, fps, 0, true, absoluteFrame)}>
						<Img src={staticFile("image/siif11.png")} alt="SIIF Slide 09" />
					</div>
				</div>
			)}

			{/* Slide 10 → siif12.png + siif12.1.png (index 11) */}
			{index === 11 && (
				<div className="visuals-container">
					<div className="phone-mockup phone-1" style={getPhoneAnimatedStyle(frame, fps, 0.08, false, absoluteFrame)}>
						<Img src={staticFile("image/siif12.png")} alt="SIIF Slide 10a" />
					</div>
					<div className="phone-mockup phone-2" style={getPhoneAnimatedStyle(frame, fps, 0.22, false, absoluteFrame)}>
						<Img src={staticFile("image/siif12.1.png")} alt="SIIF Slide 10b" />
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};

export const SIIFUserGuide: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	const bgmVolume = interpolate(
		frame,
		[durationInFrames - 45, durationInFrames],
		[0.15, 0],
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
					durationInFrames={(scene.end - scene.start) * fps}
				>
					{index >= 0 && index <= 12 && (
						<Sequence from={Math.round(0.5 * fps)}>
							<Audio src={staticFile(`audio_tracks/siif/siifslide${index + 1}.mp3`)} volume={0.95} />
						</Sequence>
					)}
					<SceneLayer scene={scene} index={index} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};

