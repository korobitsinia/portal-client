import styles from './Department.module.scss'
import PersonInTheDepartment from "../PersonInTheDepartment/PersonInTheDepartment";
import { useSelector} from "react-redux";

const Department = () => {

	const {activeDepartmentId, departments} = useSelector(({phonebook}) => phonebook)
	const activeDepartment = departments[activeDepartmentId - 1]
	const {people, name} = activeDepartment


	if (!people.length) {
		return <div>В выбраном подразделении нет телефонов</div>
	}

	return (
		<div className={styles.dep}>
			<div className={styles.title}>{name}</div>
			{people.map((person) => (
					<PersonInTheDepartment
						key={person.id}
						person={person}
						depName={name}/>
				)
			)}
		</div>
	)
}

export default Department