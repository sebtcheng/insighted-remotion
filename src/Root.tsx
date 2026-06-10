import React from "react";
import {Composition} from "remotion";
import {InsightEDPromo} from "./InsightEDPromo";

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="InsightEDPromo"
			component={InsightEDPromo}
			durationInFrames={6150}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
};
