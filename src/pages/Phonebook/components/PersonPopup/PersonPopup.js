import React from "react";
import Modal from "../../../../components/Modal/Modal";
import styles from "./PersonPopup.module.scss"

const PersonPopup = ({person, depName, close}) => {
	const {name, num_ip, num_city, num_work, num_reserve, note} = person
	let numbers = note ? note.split(",") : '';
	return (
		<Modal title={name} close={close} width={550}>
			<div className={styles.popup}>

				<div className={styles.line}>
					<span>Подразделение</span>
					<span>{depName}</span>
				</div>
				<div className={styles.line}>
					<span>Номер IP</span>
					<span>{num_ip}</span>
				</div>
				<div className={styles.line}>
					<span>Городской номер</span>
					<span>{num_city}</span>
				</div>
				<div className={styles.line}>
					<span>Рабочий номер</span>
					<span>{num_work}</span>
				</div>
				<div className={styles.line}>
					<span>Дополнительный номер</span>
					<span>{num_reserve}</span>
				</div>
				{numbers && numbers.map((i, idx) => (
					<div className={styles.line} key={idx}>
						<span>Дополнительный номер {idx + 2}</span>
						<span>{i}</span>
					</div>
				))}
			</div>
		</Modal>
	)
}

export default PersonPopup