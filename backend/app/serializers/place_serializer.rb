class PlaceSerializer
  include FastJsonapi::ObjectSerializer
  has_many :comments
  attributes :name, :description
end
