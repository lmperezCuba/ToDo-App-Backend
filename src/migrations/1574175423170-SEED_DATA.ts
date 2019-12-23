import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import {User} from "../auth/users/user.entity";
import {Role} from "../auth/roles/role.entity";

export class SEEDDATA1574175423170 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // create a Role
        const superadmirole = getRepository(Role).create({
            rolename: 'superadminrole'
        });
        await getRepository(Role).save(superadmirole);

        const superadmin = getRepository(User).create({
            username: 'superadmin',
            firstname:'Administrador',
            email: 'superadmin.aicore@aicros.cu',
            id_structure: 1,
            lastname:'AiCore',
            password: 'superadmin123',
            roles:  [superadmirole]
        });

        await getRepository(User).save(superadmin);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
