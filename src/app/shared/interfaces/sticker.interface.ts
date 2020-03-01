export interface Sticker {
    user_id: number;
    pack_id?: number;
    name: string;
    description?: string;
    shared_code: string;
    views: number;
    likes: number;
    size: string;
}
