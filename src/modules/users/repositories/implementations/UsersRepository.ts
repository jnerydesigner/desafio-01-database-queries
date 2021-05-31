import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.games", "games")
      .where("users.id = :id", { id: user_id })
      .getOne();

    if (!user) {
      throw new Error("Não existe dado na busca");
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository
      .createQueryBuilder("users")
      .select(); // Complete usando raw query
  }

  // async findUserByFullName({
  //   first_name,
  //   last_name,
  // }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
  //   return this.repository.query(); // Complete usando raw query
  // }
}
