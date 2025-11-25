import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly db : PrismaService){}
  create(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: createUserDto
    });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findFirstOrThrow({
      where : {id}
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where:{id},
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.db.user.delete({
      where:{id}
    });
  }

  addFavorite(userid: number, songid : number){
    return this.db.user.update({
      where : {id:userid},
      data:{
        favoriteSongs:{
          connect:{id:songid}
        }
      }
    })
  }

  removeFavorite(userid: number, songid : number){
    return this.db.user.update({
      where : {id:userid},
      data:{
        favoriteSongs:{
          disconnect:{id:songid}
        }
      }
    })
  }

  getFavorites(userid:number, page : number){
    const pageSize = 10
    return this.db.user.findFirstOrThrow({
      where:{id:userid},
      select:{
        favoriteSongs:{
          skip: (page-1)*pageSize,
          take: pageSize
        }
      }
    })
  }

  getUsersByDomain(domain: string){
    return this.db.user.findMany({
      where : {email : {endsWith: `@${domain}`}}
    })
  }

  
}
