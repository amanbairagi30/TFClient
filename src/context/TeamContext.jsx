// TeamContext.js
import React, { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const addTeam = (newTeam) => {
    // Add the new team to the existing teams array
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const removeTeam = (teamId) => {
    // Remove the team with the specified ID from the teams array
    setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, removeTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
