import { Observable } from "tns-core-modules/data/observable";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { Page } from "tns-core-modules/ui/page";
import {exit} from 'nativescript-exit';

export class MainModel extends Observable {

	constructor() {
		super();
	}

	onPlay(args: EventData) {
		const button: Button = <Button>args.object;
		const page: Page = button.page;
		page.frame.navigate("pages/game-page/game-page");
	}

	onQuit(args: EventData) {
		exit();
	}
}