import jwt_decode from 'jwt-decode';

export class Token {
    public accesstoken !: string;
    public refreshtoken !: string;

    public static getDecodedAccessToken(token : string): any {
        try {
          return jwt_decode(token);
        } catch(Error) {
          return null;
        }
    }

    public static isAdmin():boolean{
        const token:Token = JSON.parse(localStorage.getItem("token")!)
        const payload = token.accesstoken.split('.')[1];
        const decoded = window.atob(payload)
        const values = JSON.parse(decoded);
        const roles = values.roles;
        if(roles.indexOf('ADMIN') < 0) return false;
        return true;
    }

    public static isSuperAdmin():boolean{
        const token:Token = JSON.parse(localStorage.getItem("token")!)
        const payload = token.accesstoken.split('.')[1];
        const decoded = window.atob(payload)
        const values = JSON.parse(decoded);
        const roles = values.roles;
        if(roles.indexOf('SUPERADMIN') < 0) return false;
        return true;
    }

    public static isUser():boolean{
        const token:Token = JSON.parse(localStorage.getItem("token")!)
        const payload = token.accesstoken.split('.')[1];
        const decoded = window.atob(payload)
        const values = JSON.parse(decoded);
        const roles = values.roles;
        if(roles.indexOf('USER') < 0) return false;
        return true;
    }
}
