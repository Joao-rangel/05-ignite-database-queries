import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGenres1616108470201 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
			new Table({
				name: 'genres',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
					},
          {
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
          {
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);


    await queryRunner.createTable(
			new Table({
				name: 'genres_games_games',
				columns: [
					{
            name: 'genresId',
						type: 'uuid',
						isPrimary: true,
					},
          {
            name: 'gamesId',
            type: 'uuid',
						isPrimary: true,
          },
				],
				foreignKeys: [
          {
            name: 'FK_genres_games_genre_id',
            columnNames: ['genresId'],
            referencedTableName: 'genres',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
					{
						name: 'FK_genres_games_game_id',
						columnNames: ['gamesId'],
						referencedTableName: 'games',
						referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
					},
				],
			}),
		);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('genres_games_games');

		await queryRunner.dropTable('genres');
  }
}
