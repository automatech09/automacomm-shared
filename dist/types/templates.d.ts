export type VisualType = "Résultat" | "Classement" | "Affiche" | "Score en direct";
export type TemplateFormat = "Post" | "Story";
export interface Template {
    id: string;
    user_id: string;
    name: string;
    json_template: object;
    thumbnail: string | null;
    visualType: string | null;
    format: string | null;
    team: object | null;
    urlArrierePlan: string | null;
    lastUsed: string | null;
    created_at: string;
    updated_at: string;
}
export interface TemplateModele {
    id: number;
    visualType: VisualType;
    format: TemplateFormat;
    thumbnail: string;
    created_at: string;
    updated_at: string;
}
