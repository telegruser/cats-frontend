// export class User {
//     id: number;
//     username: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     token_data?: Token;
//     public get token() { return (this.token_data == null)? null: this.token_data.access_token };
// }

export class Token {      
    access_token: string
    expires_in: number
    token_type: string
    scope: string
    refresh_token: string
}

// export interface UserLogInData {
//   access_token: string
//   expires_in: number
//   token_type: string
//   scope: string
//   refresh_token: string
// }

export interface TokenData {
  accessToken: string,
  refreshToken: string,
  endDatetime: Date
}


// export class Cat {  
//     constructor(id: number, name: string, birthday: string, breed: string, sex: string, datetime: string){}
//   }
  
export interface CatInterface {
    id?: number,
    name: string,
    birthday: any,
    breed: string,
    sex: string,
    datetime?: any,
}

export class Cat {
    id: number;
    name: string;
    birthday: string;
    breed: string;
    sex: string;
    datetime: string;
    constructor(data: {id: number, name: string, birthday: string, breed: string, sex: string, datetime: string}) {
      this.id = data.id;
      this.name = data.name;
      this.birthday = data.birthday;
      this.breed = data.breed;
      this.sex = data.sex;
      this.datetime = data.datetime;
    }
  }
