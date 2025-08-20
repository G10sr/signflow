import { Client, Account, Databases, Avatars, ID, Query } from 'react-native-appwrite';
import { Permission, Role } from 'appwrite';

const client = new Client()
    .setProject('68519279002600a66321')
    .setPlatform('com.giosr295.signflow');

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export { ID, Query, Permission, Role };