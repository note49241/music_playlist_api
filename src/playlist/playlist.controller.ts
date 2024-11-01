import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { PlaylistsService } from "./playlist.service";
import { CreatePlaylistDto, AddSongToPlaylistDto } from "../dto/playlist.dto";

@Controller("playlists")
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  async createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  async getAllPlaylists() {
    return this.playlistsService.findAll();
  }
  @Get(":playlistsId")
  async getByPlaylists(@Param("playlistsId") playlistId: string) {
    return this.playlistsService.findByPlaylist(playlistId);
  }

  @Patch(":id/add-song")
  async addSongToPlaylist(
    @Param("id") playlistId: string,
    @Body() addSongDto: AddSongToPlaylistDto
  ) {
    return this.playlistsService.addSong(playlistId, addSongDto);
  }

  @Patch(":id/remove-song")
  async removeSongFromPlaylist(@Param("id") playlistId: string, @Body() body) {
    return this.playlistsService.removeSong(playlistId, body);
  }

  @Delete("/:playlistId")
  async removePlayList(@Param("playlistId") playlistId: string) {
    return this.playlistsService.removePlayList(playlistId);
  }
}
