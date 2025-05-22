import React, { useState } from 'react';
import { summarizeAndSendToSlack } from '../services/api';

function SummaryButton({ todos }) {
  const [status, setStatus] = useState('');

  const handleClick = async () => {
    try {
      const response = await summarizeAndSendToSlack(todos);
      setStatus('✅ Summary sent to Slack!');
    } catch (error) {
      setStatus('❌ Failed to send summary to Slack.');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Summarize & Send to Slack</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default SummaryButton;
