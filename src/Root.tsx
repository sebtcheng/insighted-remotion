import React from "react";
import {Composition} from "remotion";
import {InsightEDIntroduction} from "./InsightEDIntroduction";
import {SIIFUserGuide} from "./SIIFUserGuide";
import {InsightEDInfrastructure} from "./InsightEDInfrastructure";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="InsightEDIntroduction"
				component={InsightEDIntroduction}
				durationInFrames={4141}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="SIIFUserGuide"
				component={SIIFUserGuide}
				durationInFrames={8940}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="InsightEDInfrastructure"
				component={InsightEDInfrastructure}
				durationInFrames={10443}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};


