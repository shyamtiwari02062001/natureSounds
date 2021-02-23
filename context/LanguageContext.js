import React, { useState } from "react";

const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
	const [id, setId] = useState(0);
	const [gameId, setGameId] = useState(null);

	return (
		<LanguageContext.Provider
			value={{
				id,
				setId,
				gameId,
				setGameId
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
};
export { LanguageProvider };
export default LanguageContext;
