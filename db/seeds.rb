user1 = User.create!(first_name: "Dan", last_name: "Armstrong", email: "dan@gmail.com", password: "password")
user2 = User.create!(first_name: "Megan", last_name: "Vu", email: "megan@gmail.com", password: "password")
user3 = User.create!(first_name: "Kevin", last_name: "O", email: "kevin@gmail.com", password: "password")
user4 = User.create!(first_name: "Caitlin", last_name: "C", email: "caitlin@gmail.com", password: "password")

movie1 = Movie.create!({"title":"Into the Wild","year":"2007","rated":"R","released":"19 Oct 2007","runtime":"148 min","genre":"Adventure, Biography, Drama","director":"Sean Penn","writer":"Sean Penn (screenplay), Jon Krakauer (book)","actors":"Emile Hirsch, Marcia Gay Harden, William Hurt, Jena Malone","plot":"After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions, gives his entire $24,000 savings account to charity and hitchhikes to Alaska to live in the wilderness. Along the way, Christopher encounters a series of characters that shape his life.","language":"English, Danish","country":"USA","awards":"Nominated for 2 Oscars. Another 26 wins & 84 nominations.","poster":"http://ia.media-imdb.com/images/M/MV5BMTAwNDEyODU1MjheQTJeQWpwZ15BbWU2MDc3NDQwNw@@._V1_SX300.jpg","metascore":"73","imdbrating":"8.2","imdbid":"tt0758758"})

movie2 = Movie.create!({"title":"Troy","year":"2004","rated":"R","released":"14 May 2004","runtime":"163 min","genre":"Adventure","director":"Wolfgang Petersen","writer":"Homer (poem), David Benioff (screenplay)","actors":"Julian Glover, Brian Cox, Nathan Jones, Adoni Maropis","plot":"An adaptation of Homer's great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.","language":"English","country":"USA, Malta, UK","awards":"Nominated for 1 Oscar. Another 3 wins & 17 nominations.","poster":"http://ia.media-imdb.com/images/M/MV5BMTk5MzU1MDMwMF5BMl5BanBnXkFtZTcwNjczODMzMw@@._V1_SX300.jpg","metascore":"56","imdbrating":"7.2","imdbid":"tt0332452"})

movie3 = Movie.create!({"title":"Star Trek","year":"2009","rated":"PG-13","released":"8 May 2009","runtime":"127 min","genre":"Action, Adventure, Sci-Fi","director":"J.J. Abrams","writer":"Roberto Orci, Alex Kurtzman, Gene Roddenberry (television series \"Star Trek\")","actors":"Chris Pine, Zachary Quinto, Leonard Nimoy, Eric Bana","plot":"The brash James T. Kirk tries to live up to his father's legacy with Mr. Spock keeping him in check as a vengeful, time-traveling Romulan creates black holes to destroy the Federation one planet at a time.","language":"English","country":"USA, Germany","awards":"Won 1 Oscar. Another 23 wins & 67 nominations.","poster":"http://ia.media-imdb.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg","metascore":"83","imdbrating":"8.0","imdbid":"tt0796366"})


movie4 = Movie.create!({"title":"Gladiator","year":"2000","rated":"R","released":"5 May 2000","runtime":"155 min","genre":"Action, Drama","director":"Ridley Scott","writer":"David Franzoni (story), David Franzoni (screenplay), John Logan (screenplay), William Nicholson (screenplay)","actors":"Russell Crowe, Joaquin Phoenix, Connie Nielsen, Oliver Reed","plot":"When a Roman general is betrayed and his family murdered by an emperor's corrupt son, he comes to Rome as a gladiator to seek revenge.","language":"English","country":"USA, UK","awards":"Won 5 Oscars. Another 57 wins & 94 nominations.","poster":"http://ia.media-imdb.com/images/M/MV5BMTgwMzQzNTQ1Ml5BMl5BanBnXkFtZTgwMDY2NTYxMTE@._V1_SX300.jpg","metascore":"64","imdbrating":"8.5","imdbid":"tt0172495"})

movie5 = Movie.create!({"title":"The Star Wars Holiday Special","year":"1978","rated":"N/A","released":"17 Nov 1978","runtime":"97 min","genre":"Adventure, Family, Musical","director":"Steve Binder, David Acomba","writer":"Pat Proft, Leonard Ripps, Bruce Vilanch, Rod Warren, Mitzie Welch","actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Anthony Daniels","plot":"Chewbacca and Han Solo try to get home to Chewie's family to celebrate Life Day, which includes various forms of entertainment.","language":"English","country":"USA","awards":"N/A","poster":"http://ia.media-imdb.com/images/M/MV5BNTU2ODA2MjkwNV5BMl5BanBnXkFtZTcwOTkyMzQ0MQ@@._V1_SX300.jpg","metascore":"N/A","imdbrating":"2.6","imdbid":"tt0193524"})

movie6 = Movie.create!({"title":"Lord of War","year":"2005","rated":"R","released":"16 Sep 2005","runtime":"122 min","genre":"Crime, Drama, Thriller","director":"Andrew Niccol","writer":"Andrew Niccol","actors":"Nicolas Cage, Bridget Moynahan, Jared Leto, Shake Tukhmanyan","plot":"An arms dealer confronts the morality of his work as he is being chased by an Interpol agent.","language":"English, Ukrainian, German, Spanish, Russian, French, Arabic, Turkish","country":"USA, Germany, France","awards":"2 wins & 1 nomination.","poster":"http://ia.media-imdb.com/images/M/MV5BMjEzNDM2OTgzN15BMl5BanBnXkFtZTcwMzU3MTIzMQ@@._V1_SX300.jpg","metascore":"62","imdbrating":"7.6","imdbid":"tt0399295"})

movie7 = Movie.create!({"title":"Braveheart","year":"1995","rated":"R","released":"24 May 1995","runtime":"177 min","genre":"Action, Biography, Drama","director":"Mel Gibson","writer":"Randall Wallace","actors":"James Robinson, Sean Lawlor, Sandy Nelson, James Cosmo","plot":"When his secret bride is executed for assaulting an English soldier who tried to rape her, William Wallace begins a revolt and leads Scottish warriors against the cruel English tyrant who rules Scotland with an iron fist.","language":"English, French, Latin, Scottish Gaelic","country":"USA","awards":"Won 5 Oscars. Another 20 wins & 20 nominations.","poster":"http://ia.media-imdb.com/images/M/MV5BNjA4ODYxMDU3Nl5BMl5BanBnXkFtZTcwMzkzMTk3OA@@._V1_SX300.jpg","metascore":"68","imdbrating":"8.4","imdbid":"tt0112573"})

movie8 = Movie.create!({"title":"28 Days Later...","year":"2002","rated":"R","released":"27 Jun 2003","runtime":"113 min","genre":"Horror","director":"Danny Boyle","writer":"Alex Garland","actors":"Alex Palmer, Bindu De Stoppani, Jukka Hiltunen, David Schneider","plot":"Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.","language":"English, Spanish","country":"UK","awards":"10 wins & 25 nominations.","poster":"http://ia.media-imdb.com/images/M/MV5BNzM2NDYwNjM3OF5BMl5BanBnXkFtZTYwNDYxNzk5._V1_SX300.jpg","metascore":"73","imdbrating":"7.6","imdbid":"tt0289043"})

queued_list = QueuedList.create()
queued_list2 = QueuedList.create()
queued_list.users << user1
queued_list.users << user2

queued_list2.users << user1
queued_list2.users << user3
queued_list2.users << user4

qm1 = QueuedMovie.create(queued_list: queued_list, movie: movie1)
qm2 = QueuedMovie.create(queued_list: queued_list, movie: movie2)
qm3 = QueuedMovie.create(queued_list: queued_list, movie: movie3)
qm4 = QueuedMovie.create(queued_list: queued_list, movie: movie4)
qm5 = QueuedMovie.create(queued_list: queued_list, movie: movie5)
qm6 = QueuedMovie.create(queued_list: queued_list, movie: movie6)
qm7 = QueuedMovie.create(queued_list: queued_list, movie: movie7)
qm8 = QueuedMovie.create(queued_list: queued_list, movie: movie8)



QueuedMovie.all.each do |qm|
	queued_list.users.each do |user|
		umr = UserMovieRating.create!(movie: qm.movie, user: user, rating: rand(1..10), seen: rand(0..1).zero?, rewatch: rand(0..1).zero?, favorite: rand(0..1).zero?, comment: "These are comments on this movie", completed: false)
		qm.user_movie_ratings << umr
	end
end

# QueuedMovie.all.each do |qm|
# 		qm.complete!
# end