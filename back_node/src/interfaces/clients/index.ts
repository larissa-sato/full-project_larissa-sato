export interface IClientRequest {
    name: string
    email: string
    contact: string
}

export interface IClient {
    id: string
    name: string
    email: string
    contact: string
    updatedAt: Date
}

export interface IClientUpdate {
    name?: string
    email?: string
    contact?: string
}