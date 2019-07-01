import { Observable } from "tns-core-modules/data/observable";
import { request } from "tns-core-modules/http";
import { Toasty } from 'nativescript-toasty';
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { Page } from "tns-core-modules/ui/page";

export class LoginModel extends Observable {

    private _login: string;
    private _password: string;

    constructor() {
		super();
		this._login = '';
		this._password = '';
    }

    get login(): string {
        return this._login;
	}

	set login(login: string) {
		this._login = login;
	}
	
	get password(): string {
        return this._password;
	}
	
	set password(password: string) {
		this._password = password;
	}

    onConnect(args: EventData) {
		request({
			url: "http://10.0.2.2:1338/login",
			method: "POST",
			headers: { "Content-Type": "application/json" },
			content: JSON.stringify({
				login: this._login,
				password: this._password
			})
		}).then((response) => {
			const result = response.content.toJSON();

			const toast = new Toasty({ text: result.message });
			toast.show();

			if (result.success) {
				const button: Button = <Button>args.object;
				const page: Page = button.page;
				page.frame.navigate("pages/news-page/news-page");
			}
		}, (e) => {
			const toast = new Toasty({ text: 'Une erreur est survenue !' });
			toast.show();
		});
	}
	
	goRegister(args: EventData) {
		const button: Button = <Button>args.object;
		const page: Page = button.page;
		page.frame.navigate("pages/register-page/register-page");
	}
}
