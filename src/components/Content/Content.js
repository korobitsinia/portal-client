import React from "react";
import styles from './Content.module.scss'
import {Switch, Route, Redirect} from 'react-router-dom'
import Phonebook from "../../pages/Phonebook/Phonebook";
import Orders from "../../pages/Orders/Orders";
import Notification from "../Notification/Notification";

const Content = () => {

	const routes = (
		<Switch>
			<Route path="/phonebook" component={Phonebook}/>
			<Route path="/orders" component={Orders}/>
			<Redirect path="*" to="/phonebook"/>
		</Switch>)

	return (
		<div className={styles.content}>
			{routes}
			<Notification/>
		</div>
	)
}
export default Content