import { Injectable } from '@nestjs/common';
import { File, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
	public storage: Storage;
	public bucket: string;

	constructor(private readonly configService: ConfigService) {
		this.storage = new Storage();
		this.bucket = this.configService.get('storage.bucket.name');
	}

	public save(path: string, content: Express.Multer.File): void {
		const file: File = this.storage.bucket(this.bucket).file(path);
		file.createWriteStream({ resumable: true }).end(content.buffer);
	}
}
