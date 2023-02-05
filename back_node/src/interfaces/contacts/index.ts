export interface IContactRequest {
    name: string
    email: string
    contact: string
}

export interface IContact {
    id: string
    name: string
    email: string
    contact: string
    createdAt: Date
    updatedAt: Date
}

export interface IContactUpdate {
    name?: string
    email?: string
    contact?: string
}