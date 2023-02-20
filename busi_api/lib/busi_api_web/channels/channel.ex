defmodule BusiApiWeb.Channel do
  use Phoenix.Channel

  @impl true
  def init(device_id) do
    send(self(), :join)
    {:ok, %{id: device_id, channel: nil, connected?: false}}
  end

  @impl true
  #https://elixirforum.com/t/how-to-dynamically-make-new-channel-topics/37752/4
  def join("room:" <> private_room_id, payload, socket) do
    if !payload["token"] do
      {:error, "missing token"}
    end
    if isValid(payload["token"], private_room_id) do
      {:ok, socket}
    else
      {:error, "invalid token/lobby"}
    end
  end

  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # broadcast to everyone in the current topic
  @impl true
  def handle_in("message", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  @impl true
  def handle_in("end", payload, socket) do
    broadcast(socket, "disconnect", %{})
    {:noreply, socket}
  end

  defp isValid(token, private_room_id) do
    {ok, result} = BusiApiWeb.Handler.decrypt(token)
    if ok == :ok do
        lobby = BusiApiWeb.Lobby.to_lobby(result)
        lobby["lobby"] == private_room_id
    else
        false
    end
  end
end
