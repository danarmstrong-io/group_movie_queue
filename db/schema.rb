# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150629231603) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "list_invites", force: :cascade do |t|
    t.boolean  "completed",      default: false
    t.integer  "inviter_id"
    t.integer  "invitee_id"
    t.integer  "queued_list_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "movies", force: :cascade do |t|
    t.string   "title"
    t.integer  "year"
    t.datetime "released"
    t.string   "runtime"
    t.string   "genre"
    t.string   "rated"
    t.string   "director"
    t.string   "writer"
    t.string   "actors"
    t.text     "plot"
    t.string   "language"
    t.string   "country"
    t.string   "awards"
    t.string   "poster"
    t.string   "metascore"
    t.float    "imdbrating"
    t.string   "imdbid"
    t.integer  "imdbvotes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "queued_lists", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "queued_movie_user_ratings", force: :cascade do |t|
    t.integer  "queued_movie_id"
    t.integer  "user_movie_rating_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "queued_movies", force: :cascade do |t|
    t.integer  "movie_id"
    t.integer  "queued_list_id"
    t.boolean  "completed",      default: false
    t.boolean  "watched",        default: false
    t.float    "oogway_rating"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "queued_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "queued_list_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "user_movie_ratings", force: :cascade do |t|
    t.integer  "rating"
    t.boolean  "seen"
    t.boolean  "rewatch",    default: false
    t.boolean  "favorite",   default: false
    t.integer  "movie_id"
    t.integer  "user_id"
    t.text     "comment"
    t.boolean  "completed",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "first_name",             default: "", null: false
    t.string   "last_name",              default: "", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
