defmodule BusiApiWeb.Handler do

  def encrypt(lobby) do
    Plug.Crypto.encrypt(getSecret(), getContext() ,lobby)
  end

  def decrypt(token) do
    Plug.Crypto.decrypt(getSecret(), getContext(), token)
  end

  defp getSecret() do
    File.read!(Application.app_dir(:busi_api, "priv/secret"))
   # "my_secret"
  end

  defp getContext() do
    to_string(:context)
  end

end
