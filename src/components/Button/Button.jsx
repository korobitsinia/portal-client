import React from "react";
import styles from './Button.module.scss'

const Button = ({title, onClick, className,  type, yellow, red}) => {
	return (
		<button
			className={`
				${styles.button} 
				${yellow ? styles.yellow : null} 
				${red ? styles.red : null} 
				${className}
			`}
			onClick={onClick}
			type={type}
		>
			{title}
		</button>
	)
}

export default Button