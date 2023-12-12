// @ts-nocheck
'use client'
import { useState } from 'react';
import { BaseError } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { wagmiContractConfig } from './contracts';
import { stringify } from '../utils/stringify';

export function ProposeVote() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { write, data, error, isLoading, isError } = useContractWrite({
    ...wagmiContractConfig,
    functionName: 'proposeVote',
  });

  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  const handleVoteSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can add more validations if needed)
    if (question.trim() === '' || option1.trim() === '' || option2.trim() === '' || endDate === '' || endTime === '') {
      // Handle the case where any of the fields is empty
      return;
    }

    // Combine date and time to create a complete datetime string
    const completeEndDate = `${endDate} ${endTime}`;

    // Submit the vote by calling the contract function
    write({
      args: [question, option1, option2, completeEndDate],
    });

    // Reset the fields after submission
    setQuestion('');
    setOption1('');
    setOption2('');
    setEndDate('');
    setEndTime('');
  };

  return (
    <>
      {!isFormVisible && (
        <center>
          <button
            onClick={() => setIsFormVisible(true)}
            style={{
              borderRadius: '8px',
              padding: '8px',
              margin: '4px',
              backgroundColor: '#ADD8E6',
            }}
          >
            Propose a new vote!
          </button>
        </center>
      )}

      {isFormVisible && (
        <form onSubmit={handleVoteSubmit} style={{ marginTop: '20px' }}>
          <center>
            <label htmlFor="question">Your Question:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input-field"
              style={{
                borderRadius: '5px',
                border: '2px solid blue',
                backgroundColor: '#ADD8E6',
              }}
            />
            <br />
            <br />
            <label htmlFor="option1">Option 1:</label>
            <input
              type="text"
              id="option1"
              name="option1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              className="input-field"
              style={{
                borderRadius: '5px',
                border: '2px solid green',
                backgroundColor: '#4CAF50',
                color: 'blue',
              }}
            />

            <label htmlFor="option2">Option 2:</label>
            <input
              type="text"
              id="option2"
              name="option2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              className="input-field"
              style={{
                borderRadius: '5px',
                border: '2px solid red',
                backgroundColor: '#FF5733',
              }}
            />
            <br />
            <br />
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
              style={{
                borderRadius: '5px',
                border: '2px solid #FF5733',
                backgroundColor: '#FFD700',
              }}
            />
            <br />
            <br />
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input-field"
              style={{
                borderRadius: '5px',
                border: '2px solid #FF5733',
                backgroundColor: '#FFD700',
              }}
            />
            <br />
            <br />
            <button
              disabled={isLoading}
              type="submit"
              className="submit-button"
              style={{
                border: '2px solid black',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              Send your vote!
            </button>
          </center>
        </form>
      )}

      {isLoading && <div>Checking wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  );
}
