import React from "react";
import {
	AbsoluteFill,
	Audio,
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
		kicker: "Slide 01: Access Portal",
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
		variant: "enter-swipe",
	},
	{
		start: 44,
		end: 67,
		kicker: "Slide 02: Planning Hub",
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
		kicker: "Slide 03: Steps 1–3",
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
		variant: "enter-zoom",
	},
	{
		start: 97,
		end: 118,
		kicker: "Slide 04: Step 4 Cost",
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
		variant: "enter-blur",
	},
	{
		start: 118,
		end: 139,
		kicker: "Slide 05: Proposal",
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
		variant: "enter-swipe",
	},
	{
		start: 139,
		end: 158,
		kicker: "Slide 06: Utilization",
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
		variant: "enter-rise",
	},
	// Part 2: RO/SDO Monitoring Guide
	{
		start: 158,
		end: 177,
		kicker: "InsightED Web Portal",
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
		variant: "enter-rise",
	},
	{
		start: 177,
		end: 200,
		kicker: "Slide 07: System Access",
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
		variant: "enter-swipe",
	},
	{
		start: 200,
		end: 219,
		kicker: "Slide 08: Nexus Home",
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
		kicker: "Slide 09: Divisions",
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
		variant: "enter-zoom",
	},
	{
		start: 237,
		end: 271,
		kicker: "Slide 10: Schools Roster",
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
		variant: "enter-blur",
			},
	{
		start: 271,
		end: 293,
		kicker: "Slide 11: School Detail",
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
				<div className="brandLine">
					<div className="logoPill">i</div>
					<div>
						<div className="brandText">
							<span className="brandInsight">Insight</span>
							<span className="brandEd">ED</span>
						</div>
						<div style={{color: "rgba(255, 255, 255, 0.82)", fontWeight: 800, fontSize: 20}}>
							SIIF Integrated Slideshow
						</div>
					</div>
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

export const SIIFGuidePromo: React.FC = () => {
	const fps = useVideoConfig().fps;

	return (
		<AbsoluteFill className="videoRoot">
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
					<SceneLayer scene={scene} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
