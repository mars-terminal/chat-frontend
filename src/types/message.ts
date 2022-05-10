export interface IMessage {
    id: number
    text: string
    chat_id: number
    peer_id: number
    created_at: string
    updated_at: string
}

export interface ICreateMessageQuery {
	text: string
    chat_id: number
	peer_id: number
}
