import {Result} from './result.model';
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    imageFile: File;
    results: Result[];
}
