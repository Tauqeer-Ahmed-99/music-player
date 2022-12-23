import CreatePlaylistScreen from "../screens/CreatePlaylistScreen/CreatePlaylistScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
// import CollectionsScreen from "../screens/CollectionsScreen/CollectionsScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen/PlaylistsScreen";
import RecentlyPlayedScreen from "../screens/RecentlyPlayedScreen/RecentlyPlayedScreen";
import UploadScreen from "../screens/UploadScreen/UploadScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";

import HomeIcon from "../assets/svg/home.svg";
import RecentlyPlayedIcon from "../assets/svg/recently-played.svg";
// import CollectionsIcon from "../assets/svg/collections.svg";
import PlaylistsIcon from "../assets/svg/playlists.svg";
import CreatePlaylistIcon from "../assets/svg/create-playlist.svg";
import UploadIcon from "../assets/svg/upload.svg";
import SignupIcon from "../assets/images/signup.png";

const routes = [
  {
    icon: HomeIcon,
    label: "Landing Page",
    path: "/",
    component: LoginScreen,
  },
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
  {
    icon: UploadIcon,
    label: "Upload",
    path: "/upload",
    component: UploadScreen,
  },
  {
    icon: SignupIcon,
    label: "Sign up",
    path: "/signup",
    component: SignupScreen,
  },
  {
    icon: SignupIcon,
    label: "Login",
    path: "/login",
    component: LoginScreen,
  },
];

export default routes;
