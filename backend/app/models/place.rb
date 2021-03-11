class Place < ApplicationRecord
  has_many :comments, :dependent => :delete_all

  accepts_nested_attributes_for :comments
end
