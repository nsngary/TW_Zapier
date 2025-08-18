"""
初始資料庫 Schema 遷移
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    """
    升級資料庫 Schema
    """
    # 建立自定義類型
    workflow_status = postgresql.ENUM(
        'draft', 'active', 'inactive', 'archived',
        name='workflow_status'
    )
    workflow_status.create(op.get_bind())
    
    execution_status = postgresql.ENUM(
        'pending', 'running', 'success', 'failed', 'cancelled', 'timeout',
        name='execution_status'
    )
    execution_status.create(op.get_bind())
    
    # 建立使用者表
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=100), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
        sa.Column('is_superuser', sa.Boolean(), nullable=False, default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('last_login_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=False)
    
    # 建立使用者詳細檔案表
    op.create_table(
        'user_profiles',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('avatar_url', sa.String(length=500), nullable=True),
        sa.Column('bio', sa.Text(), nullable=True),
        sa.Column('location', sa.String(length=100), nullable=True),
        sa.Column('website', sa.String(length=500), nullable=True),
        sa.Column('phone', sa.String(length=20), nullable=True),
        sa.Column('timezone', sa.String(length=50), nullable=False, default='Asia/Taipei'),
        sa.Column('language', sa.String(length=10), nullable=False, default='zh-TW'),
        sa.Column('workflow_count', sa.Integer(), nullable=False, default=0),
        sa.Column('execution_count', sa.Integer(), nullable=False, default=0),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )
    op.create_index(op.f('ix_user_profiles_id'), 'user_profiles', ['id'], unique=False)
    
    # 建立使用者偏好設定表
    op.create_table(
        'user_preferences',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('theme', sa.String(length=20), nullable=False, default='light'),
        sa.Column('sidebar_collapsed', sa.Boolean(), nullable=False, default=False),
        sa.Column('email_notifications', sa.Boolean(), nullable=False, default=True),
        sa.Column('workflow_notifications', sa.Boolean(), nullable=False, default=True),
        sa.Column('execution_notifications', sa.Boolean(), nullable=False, default=False),
        sa.Column('marketing_emails', sa.Boolean(), nullable=False, default=False),
        sa.Column('auto_save_workflows', sa.Boolean(), nullable=False, default=True),
        sa.Column('default_workflow_privacy', sa.String(length=20), nullable=False, default='private'),
        sa.Column('additional_settings', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )
    op.create_index(op.f('ix_user_preferences_id'), 'user_preferences', ['id'], unique=False)
    
    # 建立工作流表
    op.create_table(
        'workflows',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('status', workflow_status, nullable=False, default='draft'),
        sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
        sa.Column('category', sa.String(length=50), nullable=True),
        sa.Column('tags', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('nodes', postgresql.JSONB(astext_type=sa.Text()), nullable=False, default='[]'),
        sa.Column('edges', postgresql.JSONB(astext_type=sa.Text()), nullable=False, default='[]'),
        sa.Column('settings', postgresql.JSONB(astext_type=sa.Text()), nullable=True, default='{}'),
        sa.Column('version', sa.Integer(), nullable=False, default=1),
        sa.Column('execution_count', sa.Integer(), nullable=False, default=0),
        sa.Column('success_count', sa.Integer(), nullable=False, default=0),
        sa.Column('failure_count', sa.Integer(), nullable=False, default=0),
        sa.Column('average_duration', sa.Float(), nullable=True),
        sa.Column('n8n_workflow_id', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('last_executed_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('n8n_workflow_id')
    )
    op.create_index(op.f('ix_workflows_id'), 'workflows', ['id'], unique=False)
    op.create_index(op.f('ix_workflows_user_id'), 'workflows', ['user_id'], unique=False)
    
    # 建立工作流執行記錄表
    op.create_table(
        'workflow_executions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('workflow_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('execution_id', sa.String(length=36), nullable=False),
        sa.Column('status', execution_status, nullable=False, default='pending'),
        sa.Column('trigger_type', sa.String(length=50), nullable=True),
        sa.Column('trigger_data', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('result_data', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('error_message', sa.Text(), nullable=True),
        sa.Column('error_details', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('nodes_executed', sa.Integer(), nullable=False, default=0),
        sa.Column('nodes_successful', sa.Integer(), nullable=False, default=0),
        sa.Column('nodes_failed', sa.Integer(), nullable=False, default=0),
        sa.Column('started_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('finished_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('duration', sa.Float(), nullable=True),
        sa.Column('n8n_execution_id', sa.String(length=100), nullable=True),
        sa.ForeignKeyConstraint(['workflow_id'], ['workflows.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('execution_id')
    )
    op.create_index(op.f('ix_workflow_executions_id'), 'workflow_executions', ['id'], unique=False)
    op.create_index(op.f('ix_workflow_executions_workflow_id'), 'workflow_executions', ['workflow_id'], unique=False)
    op.create_index(op.f('ix_workflow_executions_user_id'), 'workflow_executions', ['user_id'], unique=False)


def downgrade():
    """
    降級資料庫 Schema
    """
    # 刪除表格
    op.drop_table('workflow_executions')
    op.drop_table('workflows')
    op.drop_table('user_preferences')
    op.drop_table('user_profiles')
    op.drop_table('users')
    
    # 刪除自定義類型
    op.execute('DROP TYPE IF EXISTS execution_status')
    op.execute('DROP TYPE IF EXISTS workflow_status')
