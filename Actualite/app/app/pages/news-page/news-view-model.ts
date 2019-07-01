import { Observable } from "tns-core-modules/data/observable";
import { EventData } from "tns-core-modules/data/observable";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Button } from "tns-core-modules/ui/button";
import { Page } from "tns-core-modules/ui/page";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

export class NewsModel extends Observable {

	private _news: ObservableArray<Object>;
	
    constructor() {
		super();

		this._news = new ObservableArray([]);
    }

    get news(): ObservableArray<Object> {
        return this._news;
	}

	set news(news: ObservableArray<Object>) {
		this._news = news;
		this.notifyPropertyChange("news", this._news);
	}
	
    onTap(args: ItemEventData) {
		let selectedNews = this._news[args.index];

		const button: Button = <Button>args.object;
		const page: Page = button.page;
		page.frame.navigate({
			moduleName: "pages/newsInfo-page/newsInfo-page",
			context: selectedNews
		});
	}
	
	goAdd(args: EventData) {
		const button: Button = <Button>args.object;
		const page: Page = button.page;
		page.frame.navigate("pages/newsAdd-page/newsAdd-page");
	}
}
