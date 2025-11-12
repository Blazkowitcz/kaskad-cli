import {filesize} from 'filesize';
export class Torrent {
    constructor(
        public readonly name: string,
        public readonly slug: string,
        public readonly size: number
    ) {}

    /**
     * Return size to a human-readable string with appropriate units
     */
    getSize() {
        return filesize(this.size);
    }
}