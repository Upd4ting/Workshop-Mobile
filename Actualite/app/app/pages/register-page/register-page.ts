import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { RegisterModel } from "./register-view-model";

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.actionBarHidden = true;
    page.bindingContext = new RegisterModel();
}
