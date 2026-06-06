from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    database_url: str = ""
    supabase_url: str = ""
    supabase_service_role_key: str = ""

    openai_api_key: str = ""
    openai_model: str = "gpt-4o"

    upstash_redis_url: str = ""

    celery_broker_url: str = ""
    celery_result_backend: str = ""

    r2_account_id: str = ""
    r2_access_key_id: str = ""
    r2_secret_access_key: str = ""
    r2_bucket_name: str = ""
    r2_endpoint: str = ""

    clerk_jwks_url: str = ""
    clerk_issuer: str = ""
    clerk_audience: str = ""

    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""

    resend_api_key: str = ""
    resend_from_email: str = ""

    sentry_dsn: str = ""
    posthog_api_key: str = ""
    posthog_host: str = ""

    rate_limit_invoice_uploads_per_hour: int = 30
    max_upload_bytes: int = 10 * 1024 * 1024
    allowed_mime_types: str = "application/pdf,image/jpeg,image/png"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
