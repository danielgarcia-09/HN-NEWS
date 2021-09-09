import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReadNewsDto } from './dto/read-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {

    constructor(
        private readonly _newsService: NewsService,
    ){}


    @Post()
    chargeNews(): Promise<boolean> {
        return this._newsService.create();
    }

    @Get()
    allNews(): Promise<ReadNewsDto[]> {
        return this._newsService.allActiveNews();
    }

    @Put(':id')
    updateActive( @Param('id') id: string ): Promise<boolean> {
        return this._newsService.deactivateNews(id);
    }
}
