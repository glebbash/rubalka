import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { Header } from './components/Header';

export function App() {
	return (
		<div className="fh">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
			<div className="App">
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/category/:id' component={CategoryPage} />
					<Route path='/search' component={CategoryPage} />
					<Route path='/product/:id' component={ProductPage} />
				</Switch>
			</div>
		</div>
	);
};