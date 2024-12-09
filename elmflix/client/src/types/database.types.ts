export interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
    subscription_status: 'Free' | 'Premium';
    created_at: Date;
}

export interface Content {
    content_id: number;
    title: string;
    description: string;
    genre: string;
    release_date: Date;
    rating: number;
    thumbnail_url: string;
    video_url: string;
}

export interface Watchlist {
    watchlist_id: number;
    user_id: number;
    content_id: number;
    added_at: Date;
}

export interface ViewingHistory {
    history_id: number;
    user_id: number;
    content_id: number;
    watched_at: Date;
    progress: number;
}


