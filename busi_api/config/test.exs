import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :busi_api, BusiApiWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "yfuCgDMe7fk+pOE2ltO3czdW73IyZ17/M+Uw1IFY+2C4Bhz7EXhd6MeC765qdNax",
  server: false

# In test we don't send emails.
# config :busi_api, BusiApi.Mailer,
#  adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
