import React, { useState, useEffect } from 'react';
import { type Address, useContractRead } from 'wagmi';

import { wagmiContractConfig } from './contracts';

// Renommez le hook personnalisé pour éviter les conflits
function useVoteDataHook(voteNumber) {
  return useContractRead({
    ...wagmiContractConfig,
    functionName: 'votes',
    args: [BigInt(voteNumber)],
  });
}

export function All_votes() {
  const [voteNumbers, setVoteNumbers] = useState([]);
  const [allVotes, setAllVotes] = useState([]);

  // Utilisez le hook personnalisé renommé pour récupérer les données de vote
  useEffect(() => {
    const fetchAllVotes = async () => {
      // Vous devrez adapter la fonction contractuelle pour récupérer la liste des votes
      const totalVotes = 3; // Remplacez cela par la fonction réelle pour obtenir le nombre total de votes

      // Créer une liste de numéros de vote de 1 à totalVotes
      const voteNumbersArray = Array.from({ length: totalVotes }, (_, index) => index + 1);
      setVoteNumbers(voteNumbersArray);

      // Récupérer tous les votes au chargement initial
      const allVotesData = await Promise.all(
        voteNumbersArray.map(async (voteNumber) => {
          const voteData = await useVoteDataHook(voteNumber); // Utilisez le hook renommé ici
          return voteData?.toString() || '';
        })
      );

      setAllVotes(allVotesData);
    };

    fetchAllVotes();
  }, []); // Le tableau vide en tant que dépendance signifie que cela ne devrait être exécuté qu'au montage

  return (
    <div>
      <div>
        {voteNumbers.map((voteNumber, index) => (
          <DisplayVote key={index} voteNumber={voteNumber} voteData={allVotes[index]} />
        ))}
      </div>
    </div>
  );
}

function DisplayVote({ voteNumber, voteData }) {
  return (
    <div>
      Vote {voteNumber}: {voteData}
    </div>
  );
}
