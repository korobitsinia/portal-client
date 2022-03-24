import React from 'react';
import styles from './EditorPersonPopup.module.scss'
import {Modal} from '../../../../components/components'
import Input from "../../../../components/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {fieldsToObj} from "../../../../helpers/halpersFunctions";
import Button from "../../../../components/Button/Button";
import {phonebookCreatePerson, phonebookDeletePerson, phonebookUpdatePerson} from "../../../../redux/phonebook/actions";

export const EditorPersonPopup = ({person = {}, close}) => {

	const {id, name, dep, dep_group, group_pos, num_ip, num_city, num_work, num_reserve, note} = person
	const {phonebook: {departments}, authentication: {token}} = useSelector((state) => state)
	const dispatch = useDispatch()

	const submit = (e) => {
		e.preventDefault()
		if (token.length) {
			let newPersonData = fieldsToObj(e)
			if (person.id) {
				dispatch(phonebookUpdatePerson(id,dep, newPersonData, token))
			} else {
				dispatch(phonebookCreatePerson(newPersonData, token))
			}
			close()
		}
	}

	const deletePerson = () => {
		if (token.length) {
			dispatch(phonebookDeletePerson(id, dep, token))
		}
	}

	return (
		<Modal title={name ? name : 'Добавление нового сотрудника'} close={close} width={550}>

			<div className={styles.popup}>
				<form className={styles.editor} onSubmit={submit}>

					<label htmlFor="name">Имя сотрудника *</label>
					<Input id="name" defaultValue={name} centre/>

					<label htmlFor="dep">Подразделение *</label>
					<select id="dep" defaultValue={dep}>
						{departments.map((dep, idx) => {
							return (
								<option key={idx + dep.name} value={dep.id}>{dep.name}</option>
							)
						})}
					</select>

					<label htmlFor="dep_group">Группа в подразделении *</label>
					<Input id="dep_group" defaultValue={dep_group} centre/>

					<label htmlFor="group_pos">Номер по порядку в группе *</label>
					<Input id="group_pos" defaultValue={group_pos} centre/>

					<label htmlFor="num_ip"> IP номер</label>
					<Input id="num_ip" defaultValue={num_ip} centre/>

					<label htmlFor="num_city">Городской номер</label>
					<Input id="num_city" defaultValue={num_city} centre/>

					<label htmlFor="num_work">Рабочий номер</label>
					<Input id="num_work" defaultValue={num_work} centre/>

					<label htmlFor="num_reserve">Дополнительный номер</label>
					<Input id="num_reserve" defaultValue={num_reserve} centre/>

					<label htmlFor="note">Дополнительные номера (через запятую)</label>
					<Input id="note" defaultValue={note} centre/>

					<div className={styles.row}>
						{person.id &&
						<>
							<Button title="Применить" type="submit" yellow/>
							<Button title="Удалить" type="button" red onClick={deletePerson}/>
						</>}
						{!person.id && <Button title="Добавить" type="submit" yellow/>}
					</div>

				</form>
			</div>

		</Modal>
	)
}

export default EditorPersonPopup