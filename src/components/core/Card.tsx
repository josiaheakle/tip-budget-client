import * as React from "react";
import "./Card.css";

interface CardProps {
	header?: string;
	children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ header, children }) => {
	return (
		<div className={`card`}>
			{header ? <h2 className="card-header">{header}</h2> : null}
			{children}
		</div>
	);
};

export { Card };
