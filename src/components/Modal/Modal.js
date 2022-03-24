import React from "react";
import styles from './Modal.module.scss'


const Modal = (props) => {
	const {close, title} = props
	return (
		<div className={styles.dark} onClick={close}>
			<div className={styles.modal} onClick={e => e.stopPropagation()}
				 style={{maxWidth: props.width ? props.width + 'px' : null}}>
				<div className={styles.close} onClick={close}>×</div>
				<h2 className={styles.title}>{title}</h2>
				<hr className={styles.hr}/>
				{props.children}
			</div>
		</div>
	)
}

export default Modal
