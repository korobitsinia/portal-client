import { useState } from "react";
import styles from "./PersonInTheDepartment.module.scss";
import PersonPopup from "../PersonPopup/PersonPopup";
import EditorPersonPopup from "../EditorPersonPopup/EditorPersonPopup";
import { useSelector } from "react-redux";

const PersonInTheDepartment = ({ person, depName }) => {

	const { access: { phonebook } } = useSelector(({ authentication }) => authentication)
	const [modal, setModal] = useState(false)

	const handleModalToggle = () => {
		setModal((v) => !v)
	}

	const classSwitcher = (group, position, ...args) => {
		if ((group === 1) && (position === 1)) {
			return `${styles.row} ${styles.red} ${args.map(i => i)}`
		} else if ((group !== 1) && (position === 1)) {
			return `${styles.row} ${styles.yellow} ${args.map(i => i)}`
		} else {
			return `${styles.row} ${args.map(i => i)}`
		}
	}


	return (
		<>
			<div
				className={classSwitcher(person.dep_group, person.group_pos)}
				key={person.id} onClick={handleModalToggle}>
				<div>{person.name}</div>
				<div>{person.num_ip}</div>
				<div>{person.num_city}</div>
				<div>{person.num_work}</div>
				<div>{person.num_reserve}</div>
			</div>
			{modal && phonebook > 1 && <EditorPersonPopup person={person} close={handleModalToggle} />}
			{modal && phonebook <= 1 && <PersonPopup person={person} depName={depName} close={handleModalToggle} />}
		</>
	)
}

export default PersonInTheDepartment