export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    email_verified_at?: Date;
    remember_token?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class User {

    constructor(userData: User | any) {
        this.id = userData && userData.id || null;
        this.username = userData && userData.username || null;
        this.first_name = userData && userData.first_name || null;
        this.last_name = userData && userData.last_name || null;
        this.email = userData && userData.email || null;
        this.token = userData && userData.token || null;
        this.email_verified_at = userData && userData.email_verified_at || null;
        this.remember_token = userData && userData.remember_token || null;
        this.created_at = userData && userData.created_at || null;
        this.updated_at = userData && userData.updated_at || null;
    }

    fullName() {

        if (this.first_name && this.last_name) {

            const nameCapitalized = this.first_name.charAt(0).toUpperCase() + this.first_name.slice(1);
            const lastNameCapitalized = this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1);

            return nameCapitalized + ' ' + lastNameCapitalized;

        } else {
            return 'Usuario anónimo';
        }
    }

    accessToken() {
        if (!this.token.includes('Bearer') || !this.token.includes('bearer')) {
            return 'Bearer ' + this.token;
        } else {
            return this.token;
        }
    }
}
