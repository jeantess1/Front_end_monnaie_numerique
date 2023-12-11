'use client'
import { useState } from 'react';
import { BaseError } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { wagmiContractConfig } from './contracts';

export function ChooseVote() {
  const [voteNumber, setVoteNumber] = useState(1);

  const { write, data, error, isLoading, isError } = useContractWrite({
    ...wagmiContractConfig,
    functionName: 'vote',
  });

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const handleVote = (voteForA) => async () => {
    try {
      // Submit the vote
      await write({
        args: [BigInt(voteNumber), voteForA],
      });

      // Reset the state after submission
      setVoteNumber(1);
    } catch (error) {
      console.error('Error voting:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <>
      <h3>Vote</h3>
      <form>
        <label htmlFor="voteNumber">Vote Number:</label>
        <input
          type="number"
          id="voteNumber"
          name="voteNumber"
          min="1"
          step="1"
          value={voteNumber}
          onChange={(e) => setVoteNumber(Number(e.target.value))}
          className="border: 1px solid #ccc; padding: 8px; margin: 4px; box-sizing: border-box;"
        />

        <div>
          <button disabled={isLoading} onClick={handleVote(true)}>
            Vote for Proposition A
          </button>
          <button disabled={isLoading} onClick={handleVote(false)}>
            Vote for Proposition B
          </button>
        </div>
      </form>

      {isLoading && <div>Checking wallet...</div>}
      {isPending && <div>Transaction pending...</div>}

      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
      {isSuccess && <div>Vote successful!</div>}
    </>
  );
}
