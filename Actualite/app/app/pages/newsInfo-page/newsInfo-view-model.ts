import { Observable } from "tns-core-modules/data/observable";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { Page } from "tns-core-modules/ui/page";

export class NewsInfoModel extends Observable {

    private _title: string;
    private _desc: string;

    constructor(title: string, desc: string) {
		super();
		this._title = title;
		this._desc = desc;
    }

    get title(): string {
        return this._title;
	}

	set title(title: string) {
		this._title = title;
	}
	
	get desc(): string {
        return this._desc;
	}
	
	set desc(desc: string) {
		this._desc = desc;
	}
	
	goNews(args: EventData) {
		const button: Button = <Button>args.object;
		const page: Page = button.page;
		page.frame.navigate("pages/news-page/news-page");
	}
}
