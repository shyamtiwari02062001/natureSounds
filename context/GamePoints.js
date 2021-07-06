import React, { useState } from "react";
const GamePointContext = React.createContext();

const GamePointProvider = ({ children }) => {
	const [gamePoint, setGamePoint] = useState(0);
	const [languageId, setLanguageId] = useState(0);
	const [AdditionData, setAdditionData] = useState();
	const [time, setTime] = useState(1800);

	return (
		<GamePointContext.Provider
			value={{
				gamePoint,
				setGamePoint,
				languageId,
				setLanguageId,
				AdditionData,
				setAdditionData,
				time,
				setTime
			}}
		>
			{children}
		</GamePointContext.Provider>
	);
};
export { GamePointProvider };
export default GamePointContext;