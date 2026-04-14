import { useState, useEffect } from 'react';

function App() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // 监听后台脚本的消息
    // eslint-disable-next-line no-undef
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'REQUEST_COMPLETED') {
        setRequests(prev => [...prev, message.data]);
      }
    });
  }, []);

  return (
    <div style={{ width: '400px', padding: '16px' }}>
      <h2>Network Requests</h2>
      <ul>
        {requests.map((req, index) => (
          <li key={index}>
            <strong>{req.method}</strong> {req.url} - {req.statusCode}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;