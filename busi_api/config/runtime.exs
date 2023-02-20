import Config

# config/runtime.exs is executed for all environments, including
# during releases. It is executed after compilation and before the
# system starts, so it is typically used to load production configuration
# and secrets from environment variables or elsewhere. Do not define
# any compile-time configuration in here, as it won't be applied.
# The block below contains prod specific runtime configuration.

# ## Using releases
#
# If you use `mix release`, you need to explicitly enable the server
# by passing the PHX_SERVER=true when you start it:
#
#     PHX_SERVER=true bin/busi_api start
#
# Alternatively, you can use `mix phx.gen.release` to generate a `bin/server`
# script that automatically sets the env var above.
config :busi_api, BusiApiWeb.Endpoint, server: true

###############
#  READ THIS  #
###############
# For some reason elixir, under wsl, is not able to get env vars.. so i just hardcoded here. I know he implications


secret_key_base = "BECVyctqRn8cInzlxtnRCxL7eNcDUC+VTtVrNrTcHZyDbCf9foPAxD6zW10D3x70"

host = System.get_env("PHX_HOST") || "0.0.0.0"
port = System.get_env("PORT")

config :busi_api, BusiApiWeb.Endpoint,
  url: [host: host, port: 4001, scheme: "http"],
  http: [
    # Enable IPv6 and bind on all interfaces.
    # Set it to  {0, 0, 0, 0, 0, 0, 0, 1} for local network only access.
    # See the documentation on https://hexdocs.pm/plug_cowboy/Plug.Cowboy.html
    # for details about using IPv6 vs IPv4 and loopback vs public addresses.
    ip: {0, 0, 0, 0, 0, 0, 0, 0},
    port: port
  ],
  secret_key_base: secret_key_base
