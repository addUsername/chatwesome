#lobby = %{age: 30}

defmodule BusiApiWeb.Lobby do
  def create_lobby(id) do
    #expire_date = expire_date()
    %{id: "#{id}", room: "room", lobby: generate_random_loby()} #, exp: expire_date}
  end

  """
  def expire_date() do
    "#{System.os_time() + 24*60*60*1000}"
  end
  """

  def to_string(lobby) do
    Jason.encode!(lobby)
  end

  def to_lobby(str) do
    str
    |> Jason.decode!()
  end

  defp generate_random_loby() do
    UUID.uuid1()
  end
end
