export class UserRegisterModel{
    name:string;
    birthDate: Date;
    phone: string;
    bloodType: string;
    sex: string;
    city: string;
    country: string;
    file: any;

    constructor(){
        this.name = "";
        this.birthDate = new Date();
        this.phone = "";
        this.bloodType = "";
        this.sex = "";
        this.city = "";
        this.country = "";
        this.file = null;
    }
}