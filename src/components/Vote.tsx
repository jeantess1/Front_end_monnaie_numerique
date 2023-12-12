'use client'
import React, { useState, useEffect } from 'react';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { wagmiContractConfig } from './contracts';
import { BaseError } from 'viem';
let voteNumber:number;
function DisplayVote({ voteNumber : any}) {
  const { data, isRefetching, refetch } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'votes',
    args: [BigInt(voteNumber)],
  });

  const { write, isLoading, isError, error } = useContractWrite({
    ...wagmiContractConfig,
    functionName: 'vote',
  });

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const handleVote = (voteForA:any) => async () => {
    try {
      await write({
        args: [BigInt(voteNumber), voteForA],
      });
      refetch();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const voteDetails = data?.toString().split(',');
  const [voteId, question, optionA, optionB, votesA, votesB, isClosed, startTimestamp, endTimestamp] = voteDetails || [];

  const totalVotes = Number(votesA) + Number(votesB);
  const percentVotesA = totalVotes > 0 ? (Number(votesA) / totalVotes) * 100 : 0;
  const percentVotesB = totalVotes > 0 ? (Number(votesB) / totalVotes) * 100 : 0;

  const startDate = new Date(Number(startTimestamp) * 1000).toLocaleString();
  const endDate = new Date(Number(endTimestamp) * 1000).toLocaleString();

  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <p style={{textAlign: 'right'}}>
        <strong>Start Date:</strong> {startDate}
      </p>
      <p style={{textAlign: 'right'}}>
        <strong>End Date:</strong> {endDate}
      </p>
      <p>
        <center><strong>Vote {voteId}:</strong></center>
      </p>
      <p>
        <center><strong>Question:</strong> {question}</center>
      </p>
      

      <center>
        <div>
          <button
            disabled={isLoading}
            onClick={handleVote(true)}
            style={{
              border: '2px solid green',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: 'white',
              borderRadius: '5px',
            }}
          >
            {optionA}
          </button>
          <button
            disabled={isLoading}
            onClick={handleVote(false)}
            style={{
              border: '2px solid red',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              backgroundColor: '#FF5733',
              color: 'white',
              borderRadius: '5px',
            }}
          >
            {optionB}
          </button>
        </div>
      </center>

      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: `${percentVotesA}%`,
              height: '10px',
              backgroundColor: 'green',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
            }}
          />
          <div
            style={{
              width: `${percentVotesB}%`,
              height: '10px',
              backgroundColor: 'red',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
            }}
          />
        </div>
      </div>

      <div>
        <p>
          <strong>Votes for {optionA}:</strong> {votesA}
        </p>
        <p>
          <strong>Votes for {optionB}:</strong> {votesB}
        </p>
      </div>

      {isLoading && <div>Checking wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isError && <div>{error?.shortMessage}</div>}
      {isSuccess && <div>Vote successful!</div>}
    </div>
  );
}

export function Vote() {
  const [voteNumber, setVoteNumber] = useState(1);
  const [totalVotes, setTotalVotes] = useState(0);

  const { data: voteCount, isRefetching: voteCountRefetching, refetch: refetchVoteCount } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'voteCount',
    args: [],
  });

  useEffect(() => {
    if (voteCount !== undefined) {
      setTotalVotes(Number(voteCount));
    }
  }, [voteCount]);

  return (
    <div style={{ backgroundColor: 'lightblue', minHeight: '100vh', padding: '20px', animation: 'lightBlueBackground 5s infinite' }}>
      <div>
        <input
          type="number"
          id="numberInput"
          name="numberInput"
          min="1"
          max={totalVotes}
          step="1"
          value={voteNumber}
          onChange={(e) => setVoteNumber(Number(e.target.value))}
          style={{
            border: '1px solid ',
            backgroundColor: 'lightblue',
            padding: '8px',
            margin: '4px',
            boxSizing: 'border-box',
            borderRadius: '5px',
          }}
        />
        <br />
        <DisplayVote voteNumber={voteNumber} />
      </div>

      <div>
        <button
          onClick={refetchVoteCount}
          style={{
            border: '2px solid blue',
            padding: '4px',
            margin: '5px',
            cursor: 'pointer',
            backgroundColor: '#ADD8E6',
            color: 'blue',
            borderRadius: '5px',
          }}
        >
          Refresh
        </button>
      </div>

      {voteCountRefetching && <p>Loading...</p>}
      {totalVotes > 0 && (
        <div>
          {Array.from({ length: totalVotes }, (_, index) => index + 1).map((voteIndex) => (
            <div key={voteIndex}>
              <DisplayVote voteNumber={voteIndex} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
