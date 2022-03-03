import React from "react";
import styles from './Input.module.scss'

const Input = (props) => {
	return (
		<input
			id={props.id}
			style={{width:`${props.width}px`}}
			className={`${styles.input} ${props.centre? styles.centre:null} ${props.className}`}
			placeholder={props.placeholder}
			type={props.type}
			name={props.name}
			onChange={props.onChange}
			value={props.value}
			defaultValue={props.defaultValue}
		/>
	)

}

export default Input