defmodule BusiApiWeb.UserSocket do
  use Phoenix.Socket

  channel "room:*", BusiApiWeb.Channel

  def connect(params, socket, _connect_info) do
    {:ok, assign(socket, :user_id, params["user_id"])}
  end

  def id(socket), do: "users_socket:#{socket.assigns.user_id}"
end

# TODO
# Disconnect all user's socket connections and their multiplexed channels
#BusiApiWeb.Endpoint.broadcast("users_socket:10"," disconnect", %{})
