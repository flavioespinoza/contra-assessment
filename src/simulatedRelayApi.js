export function fetchProfileData(userId) {
  let userPromise = fetchUser(userId);
  return {
    userId,
    user: wrapPromise(userPromise),
  };
}

// Suspense integrations like Relay implement a contract like this to integrate with React.
// Real implementations can be significantly more complex.
function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

function fetchUser(userId) {
  console.log('fetch user ' + userId + '...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched user ' + userId);
      switch (userId) {
        case 1:
          resolve({
            name: 'Flavio Espinoza',
            email: 'flavio.espinoza@gmail.com'
          });
          break;
        case 2:
          resolve({
            name: 'Betty Rubble',
            email: 'betty.rubble@bedrockquarry.com'
          });
          break;
        case 3:
          resolve({
            name: 'Barney Rubble',
            email: 'barney.rubble@bedrockquarry.com'
          });
          break;
        default:
          throw Error('Unknown user.');
      }
    }, 2000 * Math.random());
  });
}