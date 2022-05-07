// const config = require('../config');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const authService = {
//   getUserName(db, username) {
//     return db('users').where({ username }).first();
//   },
//   comparePassword(password, hash) {
//     return bcrypt.compare(password, hash);
//   },
//   createJwt(subject, payload) {
//     return jwt.sign(payload, config.JWT_SECRET, {
//       subject,
//       expiresIn: config.JWT_EXPIRY,
//       algorithm: 'HS256',
//     });
//   },
//   verifyJwt(token) {
//     return jwt.verify(token, config.JWT_SECRET, {
//       algorithms: ['HS256'],
//     });
//   },
// };

// module.exports = authService;
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export default class AuthService {
  constructor(){}
  // private readonly id: typeof uuidv4;
  // public readonly userId: number;
  // public readonly username: string;
  // public readonly email: string;
  // public readonly firstName: string;
  // public readonly lastName: string;
  // private password: string;
  // public verified: boolean | null;
  // public readonly createdAt: Date;
  // public updatedAt: null | Date;

  private async hashPassword(password: string): Promise<Buffer> {
    const opts = {
      type: argon2.argon2i,
      memoryCost: 2 ** 4,
      hashLength: 40,
    }
    const passwordHash = await argon2.hash(password, opts && { raw: true });
    return passwordHash;
  }

  private async verifyPassword(password: string, input: string): Promise<boolean> {
    const isVerified = await argon2.verify(password, input);
    return isVerified ? true : false
  }

  private async createJwt(): Promise<string> {
    return jwt.sign('someUser', 'someSecret', { expiresIn: '45d'})
  }

}