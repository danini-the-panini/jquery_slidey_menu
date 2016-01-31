require "sinatra"
require "slim"

get "/" do
  tree = {
    'Energy' => {
      'Coal' => 3.times.map { |i| "Coal #{i+1}"},
      'Oil' => 3.times.map { |i| "Oil #{i+1}"},
      'Nuclear' => 3.times.map { |i| "Nuclear #{i+1}"}
    },
    'Transport' => {
      'Bus' => 3.times.map { |i| "Bus #{i+1}"},
      'Train' => 3.times.map { |i| "Train #{i+1}"},
      'Air' => 3.times.map { |i| "Air #{i+1}"}
    },
    'Utilities' => {
      'Electricity' => 3.times.map { |i| "Electricity #{i+1}"},
      'Water' => 3.times.map { |i| "Water #{i+1}"},
      'Gas' => 3.times.map { |i| "Gas #{i+1}"}
    }
  }

  tree = tree.map { |(k,v)| {
    name: k, children: v.map { |(k1, v1)|
      { name: k1, children: v1.map { |v2| { name: v2, children: [] } } }
    }
  }}

  tree = [
    { nil => tree },
    tree.map { |t| [t, t[:children]] }.to_h,
    tree.flat_map { |t| t[:children].map { |t1| [t1, t1[:children]] } }.to_h
  ]

  i = 1;
  tree.each { |t| t.each_value { |t1| t1.each { |t2|
    t2[:id] = i
    i += 1
  } } }

  slim :index, locals: { tree: tree }
end

get "/:file" do |f|
  send_file(f)
end
