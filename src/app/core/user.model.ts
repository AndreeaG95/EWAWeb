export class FirebaseUserModel {
  name: string;
  image: string;
  provider: string;

  constructor() {
    this.image = '';
    this.name = '';
    this.provider = '';
  }
}
