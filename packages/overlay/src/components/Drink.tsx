import styles from './Drink.module.css';

export type DrinkType = { drinkName: string; fileName: string; username: string };

export default function Drink(props: DrinkType) {
	return (
		<li class={styles.drink}>
			{props.fileName ? (
				<>
					<img width="80" src={props.fileName} />
					{/*<p>{props.username}</p>*/}
				</>
			) : (
				<p>
					{props.username} drinks a {props.drinkName}
				</p>
			)}
		</li>
	);
}
