import { onSignout } from "@/services";
import { useEffect, useState } from "react";
import { ChanneltoREST } from "../types/channel";
import { User } from "../types";
import { getChannels } from "@/services/channelService";
import { getAllUsers } from "@/services/userService";
import Link from "next/link";

const NavigationBar = () => {
  const [channels, setChannels] = useState<[ChanneltoREST]>();
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    async function fetchData() {
      const channelsData = await getChannels();
      setChannels(channelsData.props.channels);
      const userData = await getAllUsers();
      setUsers(userData.props.users);
    }

    fetchData();
  }, []);

  return (
    <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark mt-0">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/profile">Profile</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/channel" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Message
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {users != null &&
                  users.map((e, i) => <li key={i}><Link href={`/message/${e.id}`} className="dropdown-item" key={i}>{e.name}</Link></li>)}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/channel/create">Create Channel</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/channel" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Channel
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {channels != null &&
                  channels.map((e, i) => <li key={i} className="hstack gap-3">
                    <Link href={`/channel/${e.id}`} className="dropdown-item" key={i}>{e.name}</Link>
                    <button className="btn btn-outline-secondary text-start mx-1" onClick={() => window.location.href = `/channel/edit/${e.id}`}>
                      Edit</button></li>)}
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <button onClick={onSignout} className="logoutButton btn btn-outline-light">Logout</button>
          </form>
        </div>
      </div>
    </nav>

  );
};
export default NavigationBar;
