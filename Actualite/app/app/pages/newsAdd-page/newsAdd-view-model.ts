import { Observable } from "tns-core-modules/data/observable";
import { request } from "tns-core-modules/http";
import { Toasty } from 'nativescript-toasty';
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { Page } from "tns-core-modules/ui/page";

export class NewsAddModel extends Observable {

    private _title: string;
	private _short_desc: string;
	private _desc: string;

    constructor() {
		super();
		this._title = '';
		this._short_desc = '';
		this._desc = '';
    }

    get title(): string {
        return this._title;
	}

	set title(title: string) {
		this._title = title;
	}
	
	get short_desc(): string {
        return this._short_desc;
	}
	
	set short_desc(short_desc: string) {
		this._short_desc = short_desc;
	}

	get desc(): string {
        return this._desc;
	}
	
	set desc(desc: string) {
		this._desc = desc;
	}

    onAdd(args: EventData) {
		request({
			url: "http://10.0.2.2:1338/submitnews",
			method: "POST",
			headers: { "Content-Type": "application/json" },
			content: JSON.stringify({
				title: this._title,
				short_desc: this._short_desc,
				desc: this._desc
			})
		}).then((response) => {
			const result = response.content.toJSON();

			const toast = new Toasty({ text: result.message });
			toast.show();
		}, (e) => {
			const toast = new Toasty({ text: 'Une erreur est survenue !' });
			toast.show();
		});
	}
	
	goNews(args: EventData) {
		const button: Button = <Button>args.object;
		const page: Page = button.page;
		page.frame.navigate("pages/news-page/news-page");
	}
}
