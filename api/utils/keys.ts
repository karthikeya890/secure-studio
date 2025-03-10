import fs from 'fs';
import path from 'path';
import util from 'util';

// Convert fs.readFile into Promise version of the same
const readFile = util.promisify(fs.readFile);

// Function to get the private key
export const getPrivateKey = async (): Promise<string> => {
  const privateKeyPath = path.join(__dirname, '../data/keys/_secureStudio.com.privkey');
  try {
    const privateKey = await readFile(privateKeyPath, 'utf8');
    return privateKey;
  } catch (error: any) {
    throw new Error(`Error reading private key: ${error.message}`);
  }
};

// Function to get the public key
export const getPublicKey = async (): Promise<string> => {
  const publicKeyPath = path.join(__dirname, '../data/keys/_secureStudio.com');
  try {
    const publicKey = await readFile(publicKeyPath, 'utf8');
    return publicKey;
  } catch (error : any) {
    throw new Error(`Error reading public key: ${error.message}`);
  }
};
