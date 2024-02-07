import styles from "./Drink.module.css"

export default function Drink(props: { drinkName: string; fileName: string; username: string }) {
	return (
		<li class={styles.drink}>
			{props.fileName ? (
				<>
					<img src={props.fileName} />
					<p>{props.username}</p>
				</>
			) : (
				<p>
					{props.username} drinks a {props.drinkName}
				</p>
			)}
		</li>
	);
}
