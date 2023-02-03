export interface OutputBlockData {
    id?: string;
    type: "paragraph" | string;
    data: {
        text: string;
    };
}
export declare class CreatePostDto {
    title: string;
    body: OutputBlockData[];
    tags?: string;
}
