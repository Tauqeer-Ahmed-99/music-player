import CreatePlaylistScreen from "../screens/CreatePlaylistScreen/CreatePlaylistScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
// import CollectionsScreen from "../screens/CollectionsScreen/CollectionsScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen/PlaylistsScreen";
import RecentlyPlayedScreen from "../screens/RecentlyPlayedScreen/RecentlyPlayedScreen";

import HomeIcon from "../assets/svg/home.svg";
import RecentlyPlayedIcon from "../assets/svg/recently-played.svg";
// import CollectionsIcon from "../assets/svg/collections.svg";
import PlaylistsIcon from "../assets/svg/playlists.svg";
import CreatePlaylistIcon from "../assets/svg/create-playlist.svg";

const routes = [
  {
    icon: HomeIcon,
    label: "Home",
    path: "/home",
    component: HomeScreen,
  },
  {
    icon: RecentlyPlayedIcon,
    label: "Recently Played",
    path: "/recently-played",
    component: RecentlyPlayedScreen,
  },
  // {
  //   icon: CollectionsIcon,
  //   label: "Collections",
  //   path: "/collections",
  //   component: CollectionsScreen,
  // },
  {
    icon: PlaylistsIcon,
    label: "Playlists",
    path: "/playlists",
    component: PlaylistsScreen,
  },
  {
    icon: CreatePlaylistIcon,
    label: "Create Playlists",
    path: "/create-playlist",
    component: CreatePlaylistScreen,
  },
];

export default routes;
