export class FirebaseUserModel {
  name: string;
  image: string;
  provider: string;
  uid: string;

  constructor() {
    this.image = '';
    this.name = '';
    this.provider = '';
    this.uid = '';
  }
}
