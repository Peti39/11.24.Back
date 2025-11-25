import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: PrismaService){}
  create(createAlbumDto: CreateAlbumDto) {
    return this.db.album.create({
      data: createAlbumDto
    });
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: number) {
    /*return this.db.album.findMany({
      where: {id}
    });*/
    return this.db.album.findFirstOrThrow({
      where: {id},
      include : {
        songs: {
          omit:{
            albumId: true
          }
        }
      }
    })
  }

  async getAlbumLenght(id: number): Promise<number | null>{
    return (await this.db.song.aggregate({
      _sum:{
        length: true,
      },
      where:{
        albumId: id,
      }
    }))._sum.length
  }

  addSong(albumid: number, songid : number){
    return this.db.album.update({
      where : {id:albumid},
      data:{
        songs:{
          connect:{id:songid},
        },
      },
    });
  }

  removeSong(albumid: number, songid : number){
    return this.db.album.update({
      where : {id:albumid},
      data:{
        songs:{
          disconnect:{id:songid},
        },
      },
    });
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
