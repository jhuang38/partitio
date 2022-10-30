"""updated uid datatype again

Revision ID: b14b80e917d8
Revises: 766479206723
Create Date: 2022-10-30 22:08:40.106181

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b14b80e917d8'
down_revision = '766479206723'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'uid', type_ = sa.String(64))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'uid', type_ = sa.String(64))
    # ### end Alembic commands ###