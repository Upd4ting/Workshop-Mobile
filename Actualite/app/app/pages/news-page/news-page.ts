import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { NewsModel } from "./news-view-model";
import { request } from "tns-core-modules/http";
import { Toasty } from 'nativescript-toasty';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.actionBarHidden = true;
	page.bindingContext = new NewsModel();
	
	request({
		url: "http://10.0.2.2:1338/getnews",
		method: "POST",
		headers: { "Content-Type": "application/json" }
	}).then((response) => {
		const result = response.content.toJSON();

		page.bindingContext.news = result;
	}, (e) => {
		const toast = new Toasty({ text: 'Une erreur est survenue !' });
		toast.show();
	});
}
