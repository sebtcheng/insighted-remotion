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


type Scene = {
	start: number;
	end: number;
	kicker: string;
	title: string;
	subtitle: string;
	narration: string;
	visual: "network" | "mobile" | "project" | "validation" | "national" | "closing";
};

const scenes: Scene[] = [
	{
		start: 0,
		end: 8,
		kicker: "Welcome to",
		title: "InsightED",
		subtitle: "A centralized, mobile-first education data platform",
		visual: "network",
		narration:
			"Welcome to InsightED — a centralized, mobile-first platform for collecting, validating, monitoring, and analyzing school, infrastructure, personnel, finance, and resource data.",
	},
	{
		start: 8,
		end: 20,
		kicker: "One connected flow",
		title: "Role-specific portals. Shared operating picture.",
		subtitle: "Every submission contributes to a more reliable data foundation.",
		visual: "network",
		narration:
			"InsightED connects these data into one data flow. Each user works through a role-specific portal, while the information they submit contributes to a shared and more reliable operating picture.",
	},
	{
		start: 20,
		end: 42,
		kicker: "For schools",
		title: "Real-time school-level updates",
		subtitle:
			"School profiles, learner counts, resources, facilities, and infrastructure information.",
		visual: "mobile",
		narration:
			"At the school level, school heads can update school profiles, learner counts, resource and facility inventory, and infrastructure information in real time through guided modules designed for field conditions.",
	},
	{
		start: 42,
		end: 55,
		kicker: "Offline-first",
		title: "Prepare now. Sync later.",
		subtitle:
			"Records can be prepared even when internet access is limited, then synchronized when connectivity is available.",
		visual: "mobile",
		narration:
			"Offline-first workflows allow records to be prepared even when internet access is limited, then synchronized when connectivity is available.",
	},
	{
		start: 55,
		end: 78,
		kicker: "For engineers",
		title: "Structured project monitoring",
		subtitle:
			"Project records, inspection updates, geotagged evidence, damage assessments, and progress reports.",
		visual: "project",
		narration:
			"For engineers and implementing teams, project records, inspection updates, geotagged evidence, damage assessments, and progress reports are kept in a structured project-monitoring environment.",
	},
	{
		start: 78,
		end: 88,
		kicker: "From field to review",
		title: "Ground reality becomes planning evidence",
		subtitle:
			"Physical conditions are connected to records used for review, monitoring, and planning.",
		visual: "project",
		narration:
			"This helps connect physical conditions on the ground with the records used for review and planning.",
	},
	{
		start: 88,
		end: 108,
		kicker: "For divisions and regions",
		title: "Less manual consolidation",
		subtitle:
			"Submissions can be reviewed, filtered, validated, and monitored through real-time dashboards.",
		visual: "validation",
		narration:
			"For division and regional offices, InsightED reduces the burden of manual consolidation. Submissions can be reviewed, filtered, validated, and monitored in real time through dashboards instead of being repeatedly compiled across disconnected files.",
	},
	{
		start: 108,
		end: 134,
		kicker: "For central office",
		title: "Verified records for national insight",
		subtitle:
			"National summaries, facilities monitoring, class-size analysis, budget visibility, and personnel registries.",
		visual: "national",
		narration:
			"For central-office teams, verified records can support national summaries, facilities monitoring, class-size analysis, budget visibility, personnel registries, and informative dashboards.",
	},
	{
		start: 134,
		end: 147,
		kicker: "More than forms",
		title: "Usable data sooner",
		subtitle: "Clearer context. Stronger accountability. Faster decision support.",
		visual: "national",
		narration:
			"The purpose is not simply to digitize forms. The purpose is to make data usable sooner, with clearer context and stronger accountability.",
	},
	{
		start: 147,
		end: 169,
		kicker: "Better governance",
		title: "From delayed reporting to proactive response",
		subtitle:
			"Collect consistently. Validate closer to the source. Make information visible across governance levels.",
		visual: "validation",
		narration:
			"InsightED helps turn field realities into data that can be reviewed, trusted, and acted on. When information is collected consistently, validated closer to the source, and made visible across levels of governance, the Department can move from delayed reporting to more proactive analysis and response.",
	},
	{
		start: 169,
		end: 185,
		kicker: "Shared foundation",
		title: "Schools, divisions, regions, and national offices",
		subtitle: "One common basis for planning, monitoring, and decision-making.",
		visual: "network",
		narration:
			"It gives schools, divisions, regions, and national offices a common foundation for planning, monitoring, and decision-making.",
	},
	{
		start: 185,
		end: 205,
		kicker: "InsightED",
		title: "Timely. Validated. Shared.",
		subtitle:
			"A practical governance tool for better prepared, better coordinated, and more responsive planning.",
		visual: "closing",
		narration:
			"In this way, InsightED becomes more than a reporting platform. It becomes a practical governance tool that helps decision-makers work from timely, validated, and shared information, so planning is not only reactive but better prepared, better coordinated, and more responsive to the needs of schools.",
	},
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));

const BrandWord: React.FC<{className?: string}> = ({className}) => (
	<span className={className}>
		<span className="brandInsight">Insight</span>
		<span className="brandEd">ED</span>
	</span>
);

const SceneTitle: React.FC<{title: string}> = ({title}) => {
	if (title === "InsightED") {
		return <BrandWord className="titleBrand" />;
	}

	return <>{title}</>;
};

const SceneText: React.FC<{scene: Scene}> = ({scene}) => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;
	const localFrame = frame - scene.start * fps;
	const enter = clamp(localFrame / 24);
	const y = interpolate(enter, [0, 1], [36, 0]);

	const textStyle: React.CSSProperties = {
		opacity: enter,
		transform: `translateY(${y}px)`,
	};

	return (
		<div className="sceneText" style={textStyle}>
			<div className="kicker">{scene.kicker}</div>
			<h1>
				<SceneTitle title={scene.title} />
			</h1>
			<p className="subtitle">{scene.subtitle}</p>
			<p className="narration">{scene.narration}</p>
		</div>
	);
};

const NetworkVisual: React.FC = () => {
	const frame = useCurrentFrame();
	const labels = ["Schools", "Engineers", "Divisions", "Regions", "Central Office"];

	return (
		<div className="networkVisual">
			<div className="networkCenter">
				<BrandWord />
			</div>
			{labels.map((label, index) => {
				const pulse = interpolate(
					(frame + index * 12) % 90,
					[0, 45, 90],
					[0.35, 1, 0.35],
				);
				const nodeStyle = {
					"--pulse": pulse,
				} as React.CSSProperties;

				return (
					<div key={label} className={`networkNode node${index + 1}`} style={nodeStyle}>
						<span>{label}</span>
					</div>
				);
			})}
		</div>
	);
};

const PhoneVisual: React.FC = () => {
	return (
		<div className="phoneFrame">
			<div className="phoneHeader">InsightED Mobile</div>
			<div className="phoneStatus">Offline-ready field module</div>
			{["School Profile", "Learner Count", "Facilities Inventory", "Infrastructure Status"].map(
				(item) => (
					<div className="phoneRow" key={item}>
						<div className="check">✓</div>
						<div>
							<strong>{item}</strong>
							<span>Ready for validation</span>
						</div>
						<div className="syncDot" />
					</div>
				),
			)}
			<div className="syncBanner">Prepared offline. Synced when connected.</div>
		</div>
	);
};

const DashboardVisual: React.FC<{mode: Scene["visual"]}> = ({mode}) => {
	const cards =
		mode === "project"
			? ["Project Records", "Geotagged Evidence", "Damage Assessment", "Progress Reports"]
			: mode === "validation"
				? ["Submitted", "Under Review", "Validated", "Needs Action"]
				: ["National Summary", "Facilities", "Class Size", "Budget Visibility"];

	return (
		<div className="dashboard">
			<div className="browserDots">
				<span />
				<span />
				<span />
			</div>
			<div className="dashboardGrid">
				{cards.map((card, index) => (
					<div className={`metricCard metricCard${index + 1}`} key={card}>
						<div className="metricLabel">{card}</div>
						<div className="metricValue">{index === 0 ? "Live" : `${82 + index * 4}%`}</div>
						<div className="metricBar">
							<div className={`metricFill fill${index + 1}`} />
						</div>
					</div>
				))}
			</div>
			<div className="chartArea">
				{[88, 72, 61, 79, 54].map((height, index) => {
					const barStyle: React.CSSProperties = {height: height * 1.7};
					return <div className={`chartBar chartBar${index + 1}`} style={barStyle} key={index} />;
				})}
			</div>
		</div>
	);
};

const Visual: React.FC<{scene: Scene}> = ({scene}) => {
	if (scene.visual === "network" || scene.visual === "closing") {
		return <NetworkVisual />;
	}

	if (scene.visual === "mobile") {
		return <PhoneVisual />;
	}

	return <DashboardVisual mode={scene.visual} />;
};

const ProgressBar: React.FC<{scene: Scene}> = ({scene}) => {
	const frame = useCurrentFrame();
	const fps = useVideoConfig().fps;
	const progress = clamp((frame - scene.start * fps) / ((scene.end - scene.start) * fps));
	const progressStyle: React.CSSProperties = {width: `${progress * 100}%`};

	return (
		<div className="progressTrack">
			<div className="progressFill" style={progressStyle} />
		</div>
	);
};

const SceneLayer: React.FC<{scene: Scene}> = ({scene}) => {
	return (
		<AbsoluteFill className="scene">
			<div className="grid" />
			<div className="glow glowOne" />
			<div className="glow glowTwo" />
			<div className="brand">
				<div className="brandMark">i</div>
				<div>
					<div className="brandName">
						<BrandWord />
					</div>
					<div className="brandSub">Education data governance platform</div>
				</div>
			</div>
			<SceneText scene={scene} />
			<Visual scene={scene} />
			<ProgressBar scene={scene} />
		</AbsoluteFill>
	);
};

export const InsightEDPromo: React.FC = () => {
	const fps = useVideoConfig().fps;

	return (
		<AbsoluteFill className="videoRoot">
			{scenes.map((scene, index) => (
				<Sequence
					key={`${scene.start}-${scene.title}`}
					from={scene.start * fps}
					durationInFrames={(scene.end - scene.start) * fps}
				>
					<Audio src={staticFile(`audio_tracks/InsightED_PrimerVid_SL${index + 1}.mp3`)} volume={0.95} />
					<SceneLayer scene={scene} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};