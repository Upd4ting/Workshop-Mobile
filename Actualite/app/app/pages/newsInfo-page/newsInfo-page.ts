import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { NewsInfoModel } from "./newsInfo-view-model";

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.actionBarHidden = true;
    page.bindingContext = new NewsInfoModel(page.navigationContext.title, page.navigationContext.desc);
}
