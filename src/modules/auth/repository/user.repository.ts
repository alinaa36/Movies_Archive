import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";

export class UserRepository {
    async createUser(data: CreationAttributes<User>): Promise<User> {
        return await User.create(data);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }
}