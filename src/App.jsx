import React, { useEffect } from "react";
import Context from "./context"; // для передачи функций и данных по всем уровням вложенности
import "./App.css";
import TodoList from "./Todo/TodoList/TodoList";
// коммент для демонстрации ленивой загрузки компонента
/* import AddTodo from "./Todo/AddTodo/AddTodo"; */
import Loader from "./Loader";
import Modal from './Modal/modal';


/* const AddTodo = React.lazy(() => import('./Todo/AddTodo/AddTodo')); */
// для демонтстрации
const AddTodo = React.lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(import("./Todo/AddTodo/AddTodo"));
			}, 2000);
		})
);
export function App(props) {
	//деструктуризация массива - useState всегда возвращает массив
	/* const [todos, setTodos] = React.useState([
		{ id: 1, completed: false, title: "Buy bread" },
		{ id: 2, completed: true, title: "Buy broad" },
		{ id: 3, completed: false, title: "Buy milk" },
	]); */
	const [todos, setTodos] = React.useState([]);

	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
			.then((response) => response.json())
			.then((todos) =>
				setTimeout(() => {
					setTodos(todos);
					setLoading(false);
				}, 2000)
			);
	}, []);

	function toggleTodo(id) {
		setTodos(
			todos.map((item) => {
				if (item.id === id) {
					item.completed = !item.completed;
				}
				return item;
			})
		);
	}

	function addTodo(title) {
		setTodos(todos.concat([{ title, id: Date.now(), completed: false }]));
	}

	function removeTodo(id) {
		setTodos(todos.filter((todo) => todo.id !== id));
	}

	return (
		// Обернули разметку jsx в Context.Provider в его value записали объект
		// с членами которые хотим видет ниже по иерархии компонентов - см использование в TodoItem
		<Context.Provider value={{ removeTodo: removeTodo }}>
			<div className="App">
				<h1>Hello, guys! What about make plans for your life? Try to do it here now!</h1>
				<Modal />

				{/* Обернуто в React.Suspense для демонстрации ленивой загрузки */}
				<React.Suspense fallback={<p>Loading...</p>}>
					<AddTodo onCreate={addTodo} />
				</React.Suspense>

				{loading && <Loader />}
				{
					// Если в массиве задач нет объектов? то встраиваем java script блок и выводим заглущку
					todos.length > 0 ? (
						<TodoList todos={todos} onToggle={toggleTodo} />
					) : loading ? null : (
						<p>No todos to do ... Make some plans ...</p>
					)
				}
			</div>
		</Context.Provider>
	);
}

export function AppVariant(props) {
	return (
		<div className="App">
			<h1>Hello, dudes! What is time? Do u want to ask me? Yeah I know the answer:</h1>
			<DisplayTime strdate={new Date().toLocaleTimeString()} />
		</div>
	);
}

function DisplayTime(props) {
	const el = (
		<div className="timeclass">
			<h2>It is {props.strdate} now.</h2>
		</div>
	);
	return el;
}

function getZero(num) {
	if (num > 0 && num < 10) {
		return "0" + num;
	} else {
		return num;
	}
}

export function Timer(props) {
	const value = props.value;
	const INTERVAL = props.interval;
	const val = new Date(value);
	const zeroDay = new Date(0);
	const days = getZero(val.getUTCDay() - zeroDay.getUTCDay());
	const hours = getZero(val.getUTCHours());
	const minutes = getZero(val.getUTCMinutes());
	const seconds = getZero(val.getUTCSeconds());
	const miliseconds = getZero(val.getUTCMilliseconds());

	return (
		<div className="App">
			<p>Timer:</p>
			<p>
				<span>{days} : </span>
				<span>{hours} : </span>
				<span>{minutes} : </span>
				<span>{seconds} : </span>
				<span>{miliseconds}</span>
			</p>
		</div>
	);
}

export class TimerClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 0, startTime: new Date().getTime() };
	}

	//Компонент первый раз отрисовался
	componentDidMount() {
		this.timerID = setInterval(() => {
			this.setState({ value: new Date().getTime() - this.state.startTime });
		}, 100);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		const value = this.state.value;

		const val = new Date(value);
		const zeroDay = new Date(0);
		const days = getZero(val.getUTCDay() - zeroDay.getUTCDay());
		const hours = getZero(val.getUTCHours());
		const minutes = getZero(val.getUTCMinutes());
		const seconds = getZero(val.getUTCSeconds());
		const miliseconds = getZero(val.getUTCMilliseconds());

		return (
			<div className="App">
				<p>Timer:</p>
				<p>
					<span>{days} : </span>
					<span>{hours} : </span>
					<span>{minutes} : </span>
					<span>{seconds} : </span>
					<span>{miliseconds}</span>
				</p>
			</div>
		);
	}
}
