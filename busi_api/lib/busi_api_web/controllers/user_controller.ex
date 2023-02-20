defmodule BusiApiWeb.UserController do
  use BusiApiWeb, :controller

  alias BusiApiWeb.Guardian

  action_fallback BusiApiWeb.FallbackController

  def createLobby(conn, params) do

    if !params["id"] do
      conn
      |>put_status(:bad_request)
      |>json(%{error: "missing param 'id'"})
    end

    lobby = BusiApiWeb.Lobby.create_lobby(params["id"])
    token = BusiApiWeb.Handler.encrypt(BusiApiWeb.Lobby.to_string(lobby))
    IO.puts(token)
    json conn, %{lobby: lobby.lobby, room: lobby.room, token: token}
  end


end
