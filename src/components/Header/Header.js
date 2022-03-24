import React from "react";
import styles from "./Header.module.scss"
import logo from "../../assets/img/cus_logo.png";
import {NavLink} from "react-router-dom";
import Button from "../Button/Button";
import Authentication from "../Authentication/Authentication";
import {useDispatch, useSelector} from "react-redux";
import {logOutAction} from "../../redux/authentication/actions";

const Header = () => {
	const dispatch = useDispatch()
	const [authenticationModal, setAuthenticationModal] = React.useState(false)

	const handleModalToggle = () => {
		setAuthenticationModal((v) => !v)
	}

	const authGlobalStateName = useSelector(({authentication}) => authentication.access.username)
	const logOut = () => {
		dispatch(logOutAction())
	}
	return (
		<>
			<div className={styles.header}>
				<div className="container">
					<div className={styles.top}>
						<div className={styles.title}>
							<img src={logo} alt={"Logo"}/>
							<h2 className={styles.text}>Справочный портал
								<br/>some brand</h2>
						</div>
						{(authGlobalStateName === 'viewer') ?
							<Button title={"Войти"} onClick={handleModalToggle}/>
							:
							<Button title={"Выйти"} onClick={logOut}/>
						}
					</div>
				</div>
				<div className="container">
					<div className={styles.bottom}>
						<nav className={styles.navigation}>
							<NavLink to="/phonebook" exact className={styles.link} activeClassName={styles.active}>Телефонный
								справочник </NavLink>
							<NavLink to="/orders" className={styles.link} exact
									 activeClassName={styles.active}>Распоряжения</NavLink>
						</nav>
					</div>
				</div>
			</div>

			{authenticationModal &&
			<Authentication close={handleModalToggle}/>}
		</>
	)
}

export default Header
