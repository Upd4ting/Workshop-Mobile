import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { NewsAddModel } from "./newsAdd-view-model";

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.actionBarHidden = true;
    page.bindingContext = new NewsAddModel();
}
