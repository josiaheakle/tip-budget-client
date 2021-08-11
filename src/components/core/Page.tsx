import * as React from "react";
import "./Page.css";

interface PageProps {
	children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
	return <div className={`page`}>{children}</div>;
};

export { Page };
