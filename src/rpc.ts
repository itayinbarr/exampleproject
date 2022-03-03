export const rpc = (() => {

    // Utility Methods
    const _utility = (() => {
        const _http = async (obj: object, method: string, endpoint: string) => {

            const url: any = 'https://mydojo-backend-t5v9j.ondigitalocean.app';

            const response = await fetch(url + '/api/v1' + endpoint, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(obj) // body data type must match "Content-Type" header
            });

            const data: any = await response.json()
            console.log(await data)
            return data; // parses JSON response into native JavaScript objects
        }

        return {
            http: _http
        }
    })();

    // Authentication Methods
    const _auth = (() => {
        const _userAuth = async (payload: object) => {

            await _utility.http(payload, 'POST', '/auth/userAuth')

        }

        return {
            userAuth: _userAuth
        }
    })();

    const _feed = (() => {

        const _getUserFeed = async (payload: object) => {
            const data = await _utility.http(payload, 'POST', '/feed/getUserFeed');
            return data;
        }

        return {
            getUserFeed: _getUserFeed
        }

    })();

    const _workouts = (() => {

        const _createWorkout = async (payload: Object) => {
            const data = await _utility.http(payload, 'POST', '/workouts/createWorkout');
            return data;
        }

        return {
            createWorkout: _createWorkout
        }
    })()

    return {
        auth: _auth,
        feed: _feed,
        workouts: _workouts
    }
})();