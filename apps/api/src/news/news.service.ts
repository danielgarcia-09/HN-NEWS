import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { News, NewsDocument } from '../schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { ReadNewsDto } from './dto/read-news.dto';
import axios from 'axios';

@Injectable()
export class NewsService {

    constructor(
        @InjectModel(News.name)
        private newsModel: Model<NewsDocument>
    ) {}

    async create(): Promise<boolean> {
        
        try {

            let response = await axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
        
            let newsJson = response.data.hits;

            let noTitleDiscarted = newsJson.filter(news => news.title !== null || news.story_title !== null );

            noTitleDiscarted.forEach((news, i) => {

                let createNewsDto = new CreateNewsDto();
                createNewsDto.title = news.title || news.story_title;
                createNewsDto.author = news.author
                createNewsDto.url = news.story_url || news.url;
                createNewsDto.created_at = new Date(news.created_at);
                createNewsDto.active = true;

                let createdNews: NewsDocument = new this.newsModel(createNewsDto);
                createdNews.save();
            });

            return true;

        } catch(e){
            console.log(e);
            return false;
        }
        
    }

    async allActiveNews(): Promise<ReadNewsDto[]> {
        const news: NewsDocument[] = await this.newsModel.find( { active: true } ).sort('-created_at').exec();   
        return plainToClass(ReadNewsDto, news);
    }

    async deactivateNews( id: string ): Promise<boolean> {
        let news = await this.newsModel.findById(id);

        if(!news){
            return false;
        }

        news.active = false;
        news.save();

        return true;
    }

}
