import bcrypt from 'bcrypt';

export class Hashing {
  static async parse(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  static async match(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
