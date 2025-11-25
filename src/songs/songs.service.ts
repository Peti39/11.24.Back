import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(private readonly db: PrismaService){}
  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  findAll(start : number, count: number) {
    return this.db.song.findMany({
      skip: start, 
      take: count
    });
  }

  findOne(id: number) {
    return this.db.song.findFirstOrThrow({
      where: {id},
      include:{albumid : true}
    })
  }



  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }

  getTopN(top: number) {
    return this.db.song.findMany({
      orderBy: {
        length: 'desc'
      },
      take : top
    })
  }

  search(title:string){
    return this.db.song.findMany({
      where:{
        title: {
          contains: title
        }
      }
    })
  }

  getTopFavorited(){
    return this.db.song.findMany({
      orderBy:{
        favoritedBy:{
          _count: 'desc'
        }
      },
      take: 10
    })
  }

  getNewest(){
    return this.db.song.findMany({
      orderBy:{
        createdAt : 'desc'
      },
      take: 10
    })
  }
}
