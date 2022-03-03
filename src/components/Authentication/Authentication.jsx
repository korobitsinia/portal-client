import React,{ useState} from "react";
import styles from './Authentication.module.scss'
import Input from "../Input/Input";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import {statesToObject} from "../../helpers/halpersFunctions";
import {useDispatch} from "react-redux";
import {auth, registrationAction} from "../../redux/authentication/actions";


const Authentication = (props) => {
	const [username, setUsername] = useState({username: ''})
	const [password, setPassword] = useState({password: ''})
	const [repeatPassword, setRepeatPassword] = useState({repeatPassword: ''})
	const [visibleErrorRow, setVisibleErrorRow] = useState(false)
	const dispatch = useDispatch()

	const handleChangeUsername = (e) => {
		setUsername((v) => ({username: e.target.value}))
	}
	const handleChangePassword = (e) => {
		setPassword((v) => ({password: e.target.value}))
	}
	const handleChangeRepeatPassword = (e) => {
		setRepeatPassword((v) => ({repeatPassword: e.target.value}))
	}

	const setDefaultInputValues = (username = true, password = true, repeatPassword = true) => {
		if (username) {
			setUsername((v) => ({username: ""}))
		}
		if (password) {
			setPassword((v) => ({password: ""}))
		}
		if (repeatPassword) {
			setRepeatPassword((v) => ({repeatPassword: ""}))
		}
	}

	const login = () => {
		const objectToSend = statesToObject(username, password)
		setDefaultInputValues()
		dispatch(auth(objectToSend))
		props.close()
	}

	const registration = () => {
		if (repeatPassword.repeatPassword === password.password) {
			setVisibleErrorRow(false)
			const objectToSend = statesToObject(username, password)
			setDefaultInputValues()
			dispatch(registrationAction(objectToSend))
			props.close()
		} else {
			setDefaultInputValues(false, true, true)
			setVisibleErrorRow(true)
		}
	}

	return (
		<>
			<Modal title={"Авторизация"} close={props.close} width={550}>

				<div className={styles.authentication}>
					<form className={styles.form}>

						<div className={styles.row}>
							<label htmlFor={'username'}>Имя пользователя</label>
							<Input id="username" type="text" onChange={handleChangeUsername} value={username.username}/>
						</div>
						{visibleErrorRow && (
							<div className={styles.row}>
								<h4 style={{color: "maroon"}}>Пароли не совпадают. Попробуйте снова.</h4>
							</div>
						)}
						<div className={styles.row}>
							<label htmlFor={'password'}>Пароль</label>
							<Input id="password" type="password" onChange={handleChangePassword}
								   value={password.password}/>
						</div>

						<div className={`${styles.row} ${styles.alignRight}`}>
							<Button
								className={styles.authButton}
								title="Войти"
								type="button"
								onClick={login}
								yellow
							/>
						</div>
						<div className={styles.row}>
							<label htmlFor={'repeatPassword'}>Повторите пароль</label>
							<Input id="repeatPassword" type="password" onChange={handleChangeRepeatPassword}
								   value={repeatPassword.repeatPassword}/>
						</div>
						<div className={`${styles.row} ${styles.alignRight}`}>
							<Button
								className={styles.authButton}
								title="Зарегестрироваться"
								type="button"
								onClick={registration}
								red
							/>
						</div>
					</form>
				</div>
			</Modal>
		</>
	)
}


export default Authentication