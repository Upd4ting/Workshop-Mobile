import { Observable } from "tns-core-modules/data/observable";
import { request } from "tns-core-modules/http";
import { Toasty } from 'nativescript-toasty';
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { Page } from "tns-core-modules/ui/page";

export class RegisterModel extends Observable {

    private _login: string;
	private _password: string;
	private _passwordConfirm: string;

    constructor() {
		super();
		this._login = '';
		this._password = '';
		this._passwordConfirm = '';
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

	get passwordConfirm(): string {
        return this._passwordConfirm;
	}
	
	set passwordConfirm(passwordConfirm: string) {
		this._passwordConfirm = passwordConfirm;
	}

    onRegister() {
		if (this._password != this._passwordConfirm) {
			const toast = new Toasty({ text: 'Les mot de passes doivent être indentiques !' });
			toast.show();
			return;
		}

		request({
			url: "http://10.0.2.2:1338/register",
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
		}, (e) => {
			const toast = new Toasty({ text: 'Une erreur est survenue !' });
			toast.show();
		});
	}
	
	goLogin(args: EventData) {
		const button: Button = <Button>args.object;
		const page: Page = button.page;
		page.frame.navigate("pages/login-page/login-page");
	}
}
