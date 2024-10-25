import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song } from "../schema/songs.schema";
import Axios from "axios";

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  async search(query: string) {
    try {
      const response = await Axios.get(
        `https://api.deezer.com/search?q=${query}`
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
      throw error;
    }
  }

  async addSong(body) {
    const { song_name, artist, album } = body;

    const check_data_dup = await this.songModel.findOne({
      title: song_name,
      artist: artist,
      album: album,
    });

    if (check_data_dup) {
      return { code: 403, message: "dupecate song" };
    }

    const createUser = new this.songModel({
      title: song_name,
      artist: artist,
      album: album,
    }).save();

    return { code: 201, data: createUser };
  }
}
