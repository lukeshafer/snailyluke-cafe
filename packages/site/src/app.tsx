import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import PageLayout from "./components/PageLayout";

export default function App() {
	return (
		<Router root={PageLayout}>
			<FileRoutes />
		</Router>
	);
}
