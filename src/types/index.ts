export interface AnimeEvent {
    id: string;
    title: string;
    url: string;
    description: string | null;
    thumbnailUrl: string | null;
    publishedAt: number;
    animeTitle: string;
    category: string;
    location: string | null;
    eventStart: string | null;
    eventEnd: string | null;
    isHot: boolean;
    status: string;
}
