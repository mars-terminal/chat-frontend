export interface IUser {
    id: number
    first_name: string
    second_name: string
    nick_name: string
    phone: string
    email: string
    created_at: string
    updated_at: string
}

export type IUserNullable = IUser | undefined