require "csv"
file = "omdbMovies.csv"
error = 0

user1 = User.create!(first_name: "Dan", last_name: "Armstrong", email: "DAN@GMAIL.com", password: "password")
user2 = User.create!(first_name: "Megan", last_name: "Vu", email: "megan@gmail.com", password: "password")

queued_list = QueuedList.create(title: "Megan & Dan's List")
queued_list2 = QueuedList.create(title: "Big ol Fat List")
queued_list.users << user1 << user2


def create_movie(movie)
	movie_hash = {}
	movie_hash[:imdbid] = movie[1]
	movie_hash[:title] = movie[2]
	movie_hash[:year] = movie[3]
	movie_hash[:rated] = movie[4]
	movie_hash[:runtime] = movie[5]
	movie_hash[:released] = movie[7]
	movie_hash[:director] = movie[8]
	movie_hash[:writer] = movie[9]
	movie_hash[:actors] = movie[10]
	movie_hash[:imdbrating] = movie[12]
	movie_hash[:imdbvotes] = movie[13]
	movie_hash[:poster] = movie[14]
	movie_hash[:plot] = movie[16] #15 is plot 16 is full plot
	movie_hash[:language] = movie[17]
	movie_hash[:country] = movie[18]
	movie_hash[:awards] = movie[19]
	Movie.create(movie_hash)
end

def create_or_find_genres_and_add_to_movie(genres, movie)
	if genres
		genres.split(', ').each do |genre|
			movie.genres << Genre.find_or_create_by(name: genre)
		end
	end
end


File.open(file, "r:windows-1251:utf-8").each_line do |line| 
	line.gsub!(/\r/, '')
	line.gsub!('"', '')

  begin
		CSV.parse(line, { col_sep: "\t"}) do |row|
			movie = create_movie(row)
			create_or_find_genres_and_add_to_movie(row[6], movie)
    end

  rescue  CSV::MalformedCSVError => er
    	p line
    	error += 1
  end

end
puts "The number of errors was: #{error}"