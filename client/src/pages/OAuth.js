import {useLocation} from 'react-router-dom';

function OAuth() {

  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');

  const response_json = fetch('http://localhost:3001/users', {
    'method': 'POST',
    'headers': {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    'body': JSON.stringify({code: code})
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });

  return (
    <div>
      {response_json}
    </div>
  );
}

export default OAuth;