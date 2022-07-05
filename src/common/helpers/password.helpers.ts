import { compare, hash } from 'bcryptjs';

export const hashString = async (password: string): Promise<string> => {
  return hash(password, 10);
};

export const compareHashes = async (password: string, passwordDB: string): Promise<boolean> => {
  return compare(password, passwordDB);
};
