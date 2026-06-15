import React from "react";
import {Composition} from "remotion";
import {InsightEDIntroduction} from "./InsightEDIntroduction";
import {SIIFUserGuide} from "./SIIFUserGuide";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="InsightEDIntroduction"
				component={InsightEDIntroduction}
				durationInFrames={4036}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="SIIFUserGuide"
				component={SIIFUserGuide}
				durationInFrames={8790}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};


