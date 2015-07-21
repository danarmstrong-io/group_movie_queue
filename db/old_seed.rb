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
	# stuff.map do |movie|
		# puts stuff
	# genres = 
	# genres.each do |genre|
	# 	Genre.find_or_create_by(name: genre)
	# end
	stuff[:genres] = stuff[:genre].split(', ')
	# end
	stuff.delete_if {|k,v| k == :genre}
	stuff
end


# movies = ["the terminator", "terminator 2: judgment day", "terminator 3: rise of the machines", "star wars: episode i - the phantom menace", "star wars: episode ii - attack of the clones", "star wars: episode iii - revenge of the sith", "raiders of the lost ark", "indiana jones and the last crusade", "indiana jones and the temple of doom", "the star wars holiday special", "secret life of walter mitty", "dogma", "the adjustment bureau", "braveheart", "princess bride", "brothers bloom", "gladiator", "casino royale", "the mummy", "the count of monte cristo", "28 days later", "memento", "waterworld", "scent of a woman", "the odd life of timothy green", "into the wild", "lord of the rings: the fellowship of the ring", "lord of the rings: the two towers", "lord of the rings: the return of the king", "50/50", "midnight in paris", "the world's end", "nightmare before christmas", "there will be blood", "shawshank redemption", "innerspace", "equilibrium", "super troopers", "bio-dome", "the rock", "short circuit", "boondock saints", "wreck-it ralph"]

# 	movies = ["the terminator", "terminator 2: judgment day", "terminator 3: rise of the machines", "star wars: episode i - the phantom menace"]
	

# movies.each do |movie|
# 	movie_data = get_movie_data(movie)
# 	genres = movie_data[:genres]
# 	movie_data.delete_if {|k,v| k == :genres}
# 	movie = Movie.create(movie_data)
# 	genres.each do |genre|
# 		movie.genres << Genre.find_or_create_by(name: genre)
# 	end
# end	

user1 = User.create!(first_name: "Dan", last_name: "Armstrong", email: "DAN@GMAIL.com", password: "password")
user2 = User.create!(first_name: "Megan", last_name: "Vu", email: "megan@gmail.com", password: "password")
user3 = User.create!(first_name: "Kevin", last_name: "OBrien", email: "kevin@gmail.com", password: "password")
user4 = User.create!(first_name: "Caitlin", last_name: "Costa", email: "caitlin@gmail.com", password: "password")

queued_list = QueuedList.create(title: "Megan & Dan's List")
queued_list2 = QueuedList.create(title: "Big ol Fat List")
queued_list.users << user1
queued_list.invited_users << user2
queued_list2.invited_users << user2
queued_list.invited_users << user4
li = ListInvite.first
li.inviter = user1
li.save
queued_list.users << user3

queued_list2.users << user1
queued_list2.users << user3
queued_list2.users << user4

# Movie.all.each do |movie|
# 	QueuedMovie.create(queued_list: queued_list, movie: movie)
# end




# QueuedMovie.all.each do |qm|
# 	queued_list.users.each do |user|
# 		umr = UserMovieRating.create!(movie: qm.movie, user: user, rating: rand(1..10), seen: rand(0..1).zero?, rewatch: rand(0..1).zero?, favorite: rand(0..1).zero?, comment: "These are comments on this movie", completed: false)
# 		qm.user_movie_ratings << umr
# 	end
# 	qm.complete!
# end

# Movie.all.each do |movie|
# 	MovieComment.create(movie: movie, user: user1, text: "In a future where the polar ice-caps have melted and Earth is almost entirely submerged")
# 	MovieComment.create(movie: movie, user: user1, text: "a mutated mariner fights starvation and outlaw smokers")
# 	MovieComment.create(movie: movie, user: user1, text: "and reluctantly helps a woman and a young girl try to find dry land.")
# end