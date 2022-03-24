import React from "react";
import styles from "./Footer.module.scss"

const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className="container">
				<div className={styles.copyright}>
					<div className={styles.left}>
						ЦИТ 2021
					</div>
					<div className={styles.right}>
						some text
					</div>
				</div>

			</div>
		</div>
	)
}

export default Footer
