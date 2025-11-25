import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';


// Lekérd
// ID lekérd
// - Összes zeneszám
// - Az album öszz hosszát
//Zeneszám hozzáad

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const album = await this.albumsService.findOne(+id);
    const lenght = await this.albumsService.getAlbumLenght(+id);
    return{
      ...album,
      lenght,
    }
  }

  //:albumid/:songid
  @Post(':albumid/addSong/:songid')
  addSong(@Param('albumid') albumid: string, @Param('songid') songid: string){
    return this.albumsService.addSong(+albumid,+songid)

  }

  @Delete(':albumid/removeSong/:songid')
  removeSong(@Param('albumid') albumid: string, @Param('songid') songid: string){
    return this.albumsService.removeSong(+albumid,+songid)

  }

  


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(+id);
  }
}
