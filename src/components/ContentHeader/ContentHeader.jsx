import React from "react";
import styles from "./ContentHeader.module.scss";

const ContentHeader = (props) => {

	return (
		<div className={styles.head}>
			<div className="container">
				{props.children}
			</div>
		</div>

	)
}


export default ContentHeader