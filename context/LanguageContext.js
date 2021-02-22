import React, { useState } from "react";

const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
	const [id, setId] = useState(0);

	return (
		<LanguageContext.Provider
			value={{
				id,
				setId
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
};
export { LanguageProvider };
export default LanguageContext;
