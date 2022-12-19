"""updated foreign key for user collection map

Revision ID: 2da2c080d759
Revises: 516fd324773a
Create Date: 2022-12-03 20:22:05.102861

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2da2c080d759'
down_revision = '516fd324773a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'collections', ['collection_id'])
    op.add_column('user_collection_map', sa.Column('username', sa.String(length=64), nullable=True))
    op.drop_constraint('user_collection_map_user_id_fkey', 'user_collection_map', type_='foreignkey')
    op.create_foreign_key(None, 'user_collection_map', 'users', ['username'], ['username'])
    op.drop_column('user_collection_map', 'user_id')
    op.create_unique_constraint(None, 'users', ['username'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.add_column('user_collection_map', sa.Column('user_id', sa.VARCHAR(length=64), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'user_collection_map', type_='foreignkey')
    op.create_foreign_key('user_collection_map_user_id_fkey', 'user_collection_map', 'users', ['user_id'], ['uid'])
    op.drop_column('user_collection_map', 'username')
    op.drop_constraint(None, 'collections', type_='unique')
    # ### end Alembic commands ###