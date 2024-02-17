export interface Client {
    name: string;
    email: string;
    telephone: string;
    services: any[];
    total: number;
    nPages?: number;
    nLanguages?: number;
    formDate: Date;
}
