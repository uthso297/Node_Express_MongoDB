export interface IUser {
    firstName: string,
    lastname: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
}