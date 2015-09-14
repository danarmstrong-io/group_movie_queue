require 'rubygems'
require 'json'
require 'open-uri'

def get_movie_data(title)
	movieAPI = open('http://www.omdbapi.com/?t=' + title )
	data = JSON.parse(movieAPI.read)
	fix_hash(data)
end

def fix_hash(data)
	stuff = data.inject({}) do |memo,(k,v)|
 		memo[k.to_sym.downcase] = v; memo
	end
	stuff.delete_if {|k,v| k == :type}
	stuff.delete_if {|k,v| k == :response}
	stuff[:genres] = stuff[:genre].split(', ')
	stuff.delete_if {|k,v| k == :genre}
	stuff
end


# movies = ["the terminator", "terminator 2: judgment day", "terminator 3: rise of the machines", "star wars: episode i - the phantom menace", "star wars: episode ii - attack of the clones", "star wars: episode iii - revenge of the sith", "raiders of the lost ark", "indiana jones and the last crusade", "indiana jones and the temple of doom", "the star wars holiday special", "secret life of walter mitty", "dogma", "the adjustment bureau", "braveheart", "princess bride", "brothers bloom", "gladiator", "casino royale", "the mummy", "the count of monte cristo", "28 days later", "memento", "waterworld", "scent of a woman", "the odd life of timothy green", "into the wild", "lord of the rings: the fellowship of the ring", "lord of the rings: the two towers", "lord of the rings: the return of the king", "50/50", "midnight in paris", "the world's end", "nightmare before christmas", "there will be blood", "shawshank redemption", "innerspace", "equilibrium", "super troopers", "bio-dome", "the rock", "short circuit", "boondock saints", "wreck-it ralph"]
# movies = ["the terminator", "terminator 2: judgment day", "terminator 3: rise of the machines", "star wars: episode i - the phantom menace"]
movies = ["aladdin"]


movies.each do |movie|
	movie_data = get_movie_data(movie)
	genres = movie_data[:genres]
	movie_data.delete_if {|k,v| k == :genres}
	movie = Movie.create(movie_data)
	genres.each do |genre|
		movie.genres << Genre.find_or_create_by(name: genre)
	end
end

user1 = User.create!(first_name: "Dan", last_name: "Armstrong", email: "dan@gmail.com", password: "password")
user2 = User.create!(first_name: "Megan", last_name: "Vu", email: "megan@gmail.com", password: "password")


queued_list = QueuedList.create(title: "Megan & Dan's List")
queued_list.users << user1 << user2


Movie.all.each do |movie|
	QueuedMovie.create(queued_list: queued_list, movie: movie)
end




QueuedMovie.all.each do |qm|
	queued_list.users.each do |user|
		# umr = UserMovieRating.create!(movie: qm.movie, user: user, rating: rand(1..10), seen: rand(0..1).zero?, rewatch: rand(0..1).zero?, favorite: rand(0..1).zero?, comment: "These are comments on this movie", completed: true)
		umr = UserMovieRating.create(movie: qm.movie, user: user)
		umr.check_if_complete

	end
	# qm.complete!
end











## BIG DATABASE

# require "csv"
# file = "omdbMovies.csv"
# error = 0

# user1 = User.create!(first_name: "Dan", last_name: "Armstrong", email: "DAN@GMAIL.com", password: "password")
# user2 = User.create!(first_name: "Megan", last_name: "Vu", email: "megan@gmail.com", password: "password")

# queued_list = QueuedList.create(title: "Megan & Dan's List")
# queued_list2 = QueuedList.create(title: "Big ol Fat List")
# queued_list.users << user1 << user2


# def create_movie(movie)
# 	movie_hash = {}
# 	movie_hash[:imdbid] = movie[1]
# 	movie_hash[:title] = movie[2]
# 	movie_hash[:year] = movie[3]
# 	movie_hash[:rated] = movie[4]
# 	movie_hash[:runtime] = movie[5]
# 	movie_hash[:released] = movie[7]
# 	movie_hash[:director] = movie[8]
# 	movie_hash[:writer] = movie[9]
# 	movie_hash[:actors] = movie[10]
# 	movie_hash[:imdbrating] = movie[12]
# 	movie_hash[:imdbvotes] = movie[13]
# 	movie_hash[:poster] = movie[14]
# 	movie_hash[:plot] = movie[16] #15 is plot 16 is full plot
# 	movie_hash[:language] = movie[17]
# 	movie_hash[:country] = movie[18]
# 	movie_hash[:awards] = movie[19]
# 	Movie.create(movie_hash)
# end

# def create_or_find_genres_and_add_to_movie(genres, movie)
# 	if genres
# 		genres.split(', ').each do |genre|
# 			movie.genres << Genre.find_or_create_by(name: genre)
# 		end
# 	end
# end


# File.open(file, "r:windows-1251:utf-8").each_line do |line|
# 	line.gsub!(/\r/, '')
# 	line.gsub!('"', '')

#   begin
# 		CSV.parse(line, { col_sep: "\t"}) do |row|
# 			movie = create_movie(row)
# 			create_or_find_genres_and_add_to_movie(row[6], movie)
#     end

#   rescue  CSV::MalformedCSVError => er
#     	p line
#     	error += 1
#   end

# end
# puts "The number of errors was: #{error}"
