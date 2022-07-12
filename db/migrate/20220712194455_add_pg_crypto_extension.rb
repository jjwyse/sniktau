class AddPgCryptoExtension < ActiveRecord::Migration[7.0]
  def change
    execute('CREATE EXTENSION if not exists pgcrypto')
  end
end
