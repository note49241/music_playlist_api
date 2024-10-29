import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Playlist } from "../schema/playlist.schema";
import { CreatePlaylistDto, AddSongToPlaylistDto } from "../dto/playlist.dto";

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = new this.playlistModel(createPlaylistDto);
    return newPlaylist.save();
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistModel.find().populate("songs").exec();
  }

  async findByPlaylist(playlistId: string): Promise<Playlist[]> {
    return await this.playlistModel.findById(playlistId);
  }

  async addSong(playlistId: string, addSongDto): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) throw new NotFoundException("Playlist not found");
    playlist.songs.push(addSongDto);

    return playlist.save();
  }

  async removeSong(playlistId: string, body): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) throw new NotFoundException("Playlist not found");

    playlist.songs = playlist.songs.filter((song) => song.id !== body.songId);

    await playlist.save();
    return playlist;
  }

  async removePlayList(id: string) {
    const playlist = await this.playlistModel.deleteOne({ _id: id });
    return playlist;
  }
}
