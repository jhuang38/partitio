"""reset users

Revision ID: 90aaf9e88196
Revises: 
Create Date: 2022-11-12 06:20:39.022134

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '90aaf9e88196'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('uid', sa.String(length=64), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=True),
    sa.Column('created_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('username'),
    sa.UniqueConstraint('uid')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
