import React from "react";
import {Composition} from "remotion";
import {InsightEDPromo} from "./InsightEDPromo";
import {SIIFGuidePromo} from "./SIIFGuidePromo";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="InsightEDPromo"
				component={InsightEDPromo}
				durationInFrames={6150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="SIIFGuidePromo"
				component={SIIFGuidePromo}
				durationInFrames={8790}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};


