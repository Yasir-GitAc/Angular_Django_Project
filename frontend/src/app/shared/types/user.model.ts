export class User {
  constructor(
    public name: string,
    public email: string,
    public profile_imagepath: string,
    public address: string
  ) {}

  // get auth_token() {
  //   return this.token;
  // }

  // set set_token(token: string) {
  //   this.token = token;
  // }
}
