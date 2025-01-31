import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import "./PlayerCard.css";
import LockIcon from "@mui/icons-material/Lock";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";


function PlayerCard({ player, onClick, className, votes, isRoleVisible }) {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("alive");
  const [role, setRole] = useState("hidden");

  useEffect(() => {
    if (isRoleVisible) {
      setRole(player.role.toLowerCase());
    } else if (player.user._id === user._id || player.status === "Dead") {
      setRole(player.role.toLowerCase());
    } else {
      setRole("hidden");
    }
    if (player.status.toLowerCase() !== status) {
      setStatus(player.status.toLowerCase());
    }
  }, [player, isRoleVisible]);

  return (
    <div className={`PlayerCard ${className && className} ${role !== "hidden" ? "reveal" : ""}`} onClick={(event) => {
      if (!onClick) return;
      onClick(event);
    }}>
      <div className={`user-info ${player.user._id === user._id ? "me" : ""}`}>
        <ProfilePicture user={player.user} title={player.user.username} />
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className={`bg back`} />
          <div className={`bg front ${status} ${role}`} />
        </div>

        <div className="content">
          <div className="votes">
            {votes && (
              <>
                <div className="cast">
                  {votes && (
                    votes.map((voter) => (
                      voter.vote.state === "Cast" && (
                        <ProfilePicture
                          key={`PlayerCard-vote-${voter.user._id}`}
                          user={voter.user}
                          title={voter.user.username}
                          className={`vote`}
                        />
                      )
                    ))
                  )}
                </div>
                <div className="locked">
                  {votes.map((voter) => (
                    voter.vote.state === "Locked" && (
                      <div className="vote-wrapper" key={`PlayerCard-vote-locked-${voter.user._id}`}>
                        <ProfilePicture
                          user={voter.user}
                          title={voter.user.username}
                          className={`vote`}
                        />
                        <div className="icon-wrapper">
                          <LockIcon className="lock-icon" />
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </>

            )}
          </div>
        </div >
      </div>
    </div >
  );
}

export default PlayerCard;
